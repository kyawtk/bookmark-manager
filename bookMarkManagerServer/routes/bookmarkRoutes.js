import { Router } from "express";
import Folder from "../models/Folder.js";
import asyncHandler from "express-async-handler";
import Bookmark from "../models/Bookmark.js";
const router = Router();

/// get all bookmarks
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookmarks = await Bookmark.find({}).populate("folder").exec();
    if (bookmarks) {
      res.json(bookmarks);
    } else {
      res.status(404);
      throw new Error("Something went wrong");
    }
  })
);

//ctreat a new bookmark and add to the folder
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { folderId, bookmark } = req.body;
    const folder = await Folder.findById(folderId);
    if (folder) {
      const newBookmark = new Bookmark({...bookmark , folder:folderId});
      if (newBookmark) {
        folder.bookmarks.push(newBookmark._id);
        await Promise.all([folder.save(), newBookmark.save()]);
        res.json(newBookmark);
      } else {
        res.status(500);
        throw new Error("Something went wrong creating new bookmark");
      }
    } else {
      res.status(404);
      throw new Error("folder Not found");
    }
  })
);

router.put(
  "/:bookMarkId",
  asyncHandler(async (req, res) => {
    const { bookMarkId } = req.params;
    const { name, url } = req.body;
    const bookMark = await Bookmark.findById(bookMarkId);
    bookMark.name = name;
    bookMark.url = url;
    const newBookMark = await bookMark.save();
    if (newBookMark) {
      res.json(newBookMark);
    } else {
      res.status(500);
      throw new Error("Something went wrong");
    }
  })
);


//delete bookmark by one id.
router.delete(
  "/:bookMarkId",
  asyncHandler(async (req, res) => {
    const { bookMarkId } = req.params;
    const bookmark = await Bookmark.findByIdAndDelete(bookMarkId);

    if (bookmark) {
      const folderId = bookmark.folder; // Assuming you have a field 'folder' in your Bookmark schema
      if (folderId) {
        const folder = await Folder.findById(folderId);

        if (folder) {
          folder.bookmarks.pull(bookMarkId); // Remove bookmark from folder's bookmarks array
          await folder.save();
        }
      }
      res.status(200).json(bookmark);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  })
);

export default router;


//delete bookmark by array of ids
router.delete('/', asyncHandler(async (req, res) => {
  const {ids} = req.body;
 
  try {
   
    //get folder id 
    const bm = await Bookmark.findById(ids[0]);
    const folderId = bm.folder;
    
    // Delete bookmarks
    await Bookmark.deleteMany({ _id: { $in: ids } });

     // Remove deleted bookmark IDs from the folder's bookmarks array
     await Folder.findByIdAndUpdate(folderId, { $pull: { bookmarks: { $in: ids } } });

    res.json({ message: 'Bookmarks deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }

}))
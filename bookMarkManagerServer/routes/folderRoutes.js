import { Router } from "express";
import Folder from "../models/Folder.js";
import asyncHandler from "express-async-handler";
import Bookmark from '../models/Bookmark.js'
const router = Router();



//get all folders.
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const folders = await Folder.find();
    if(folders){
        res.json(folders)
        
    }else{
      res.status(404)
      throw new Error('Something went Wrong')
    }
    
  })
);


//create a new Folder
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const folder = req.body;
    const newFolder = new Folder(folder);
    const savedFolder = await newFolder.save();
    if (savedFolder) {
      res.status(201).json(savedFolder);
    } else {
      throw new Error("Error Creating Folder");
    }
  })
);


//get folder by id , get also bookmarks with it
router.get('/:folderId' , asyncHandler(async(req, res)=>{
    const {folderId} = req.params;
    const folder = await Folder.findById(folderId).populate('bookmarks').exec()
   if(folder){
    res.json(folder)
   }else{
    res.status(404)
    throw new Error('Folder not found')
   }
}))
router.delete(
  "/:folderId",
  asyncHandler(async (req, res) => {
    const {folderId} = req.params;
    
        const folder = await Folder.findById(folderId);
    
        if (!folder) {
          return res.status(404).json({ message: "Folder not found" });
        }
    
        // Delete associated bookmarks
        await Bookmark.deleteMany({ _id: { $in: folder.bookmarks } });
    
        // Delete the folder
        await Folder.findByIdAndDelete(folderId);
    
        res.json({ message: "Folder and associated bookmarks deleted" });
      
  })
);


export default router;

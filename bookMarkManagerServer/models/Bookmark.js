import mongoose, { Schema, model } from "mongoose";

const BookmarkSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    tags: [{type:String}],
    note: { type: String },
    folder:{type:Schema.Types.ObjectId,ref:'Folder'}
  },
  { timestamps: true }
);

const Bookmark = model("Bookmark", BookmarkSchema);
export default Bookmark;

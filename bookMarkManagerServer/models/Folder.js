import { Schema, model } from "mongoose";

const FolderSchema  = new Schema({
    name:{type:String, required:true},
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Bookmark" }],

})


const Folder = model("Folder" , FolderSchema)
export default Folder;
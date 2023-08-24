import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState, useContext } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import { BookMarkContext } from "../context/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
const AddBookMark = ({ folder ,refresh}) => {
  const [bookmark, setBookmark] = useState({ name: "", url: "" });
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookmark((current) => ({ ...current, [name]: value }));
  };

  const handleAdd = () => {
    if(bookmark.name.length < 1 || bookmark.url.length < 1){
      alert("Please fill in all fields");
    }
    axios
      .post("http://localhost:4000/bookmarks", {
        folderId: folder._id,
        bookmark,
      })
      .then((res) => {
       
        refresh()
      });
    setOpen(false);
    setBookmark({ name: "", url: "" });
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} startIcon={<AddIcon></AddIcon>}>
        Add BookMarks
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add BookMark</DialogTitle>
        <DialogContent>
          <TextField
          required
            value={bookmark.name}
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
          required
            margin="dense"
            id="url"
            value={bookmark.url}
            label="Url"
            type="url"
            name="url"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleAdd()}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddBookMark;

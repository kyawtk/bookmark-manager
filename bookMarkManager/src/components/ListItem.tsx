import EditIcon from "@mui/icons-material/Edit";
import {
  ListItem,
  ListItemText,
  Paper,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";

import { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";


import axios from "axios";
const BookMarkListItem = ({ bm, refresh ,handleCheck}) => {


  const [checked, setChecked] = useState(false);

  const handleToggle = ()=> {
    setChecked(prev=> !prev);
    
  
  };

  useEffect(()=>{
    
    handleCheck(checked, bm._id);
  },[checked])

  const [open, setOpen] = useState(false);
  const [newBookMark, setNewBookMark] = useState({
    name: bm.name,
    url: bm.url,
  });
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleSave = () => {
    if(newBookMark.name.length < 1 || newBookMark.url.length < 1){
      alert("Please fill in all fields");
    }
    axios
      .put(`http://localhost:4000/bookmarks/${bm._id}`, newBookMark)
      .then((res) => {
       
        refresh();
      });

    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBookMark((current) => ({ ...current, [name]: value }));
  };

  return (
    <Paper elevation={3} key={bm._id}>
      <ListItem
        button
        secondaryAction={
          <Checkbox
           
            edge="end"
            onChange={handleToggle}
            checked={checked}
            inputProps={{ "aria-labelledby": bm.name }}
          />
        }
      >
        <ListItemText
          primary={bm.name}
          secondary={bm.url}
          onClick={() => window.open(bm.url, "_blank", "noreferrer")}
        />
        <IconButton sx={{marginRight: "5px"}} edge="end" aria-label="edit" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </ListItem>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit BookMark</DialogTitle>
        <DialogContent>
          <TextField
          required
            value={newBookMark.name}
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
            value={newBookMark.url}
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
          <Button onClick={() => handleSave()}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default BookMarkListItem;

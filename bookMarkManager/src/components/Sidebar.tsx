import Drawer from "@mui/material/Drawer";

import axios from "axios";

import {
  Button,
  IconButton,
  DialogContentText,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  ListItemButton,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { fetcher } from "../utils/fetcher";

const drawerWidth = 240;

export default function SideBar() {
  const {
    data: folders,
    error,
    isLoading,
  } = useSWR("http://localhost:4000/folders", fetcher);
  console.log(folders);
  const [newFolder, setNewFolder] = useState({ name: "" });
  const [open, setOpen] = useState(false);
  
  const handleChange = (e) => {
    setNewFolder((current) => ({ ...current, name: e.target.value }));
  };
  const handleSave = () => {
    if (newFolder.name === "") {
      return;
    }
    axios.post("http://localhost:4000/folders", newFolder).then((res) => {
      console.log(res);
      mutate("http://localhost:4000/folders");
    });
    setNewFolder({ name: "" });
    setOpen(false);
  };

  const deleteFolder = (id) => {
    axios.delete(`http://localhost:4000/folders/${id}`).then((res) => {
      console.log(res);
      mutate("http://localhost:4000/folders");
      setDelOpen(false);
    });
  };




// Create a state to manage the visibility of delete dialogs for each folder
const [folderDeleteStates, setFolderDeleteStates] = useState({});

// Function to toggle the delete dialog for a specific folder
const toggleFolderDeleteDialog = (folderId) => {
  setFolderDeleteStates((prevStates) => ({
    ...prevStates,
    [folderId]: !prevStates[folderId], // Toggle the current state
  }));
};

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="All BookMarks" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="button" onClick={() => setOpen(true)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Folder" />
          </ListItemButton>
        </ListItem>
        <Divider></Divider>
        {folders &&
          folders.map((f) => {
            return (
              <ListItem
                key={f._id}
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => toggleFolderDeleteDialog(f._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton component={Link} to={`/${f._id}`}>
                  <ListItemText primary={f.name} />
                </ListItemButton>
                <Dialog
                  open={folderDeleteStates[f._id] || false} // Use the specific folder's delete state
                  onClose={() => toggleFolderDeleteDialog(f._id)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Delete Folder
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this folder? All of the
                      bookmarks in this folder will be deleted.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() =>  toggleFolderDeleteDialog(f._id)}>Cancel</Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteFolder(f._id)}
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </ListItem>
            );
          })}
      </List>
      {/* dialog for creating new folder*/}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Folder</DialogTitle>
        <DialogContent>
          <TextField
            value={newFolder.name}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleSave()}>Save</Button>
        </DialogActions>
      </Dialog>

      {/*dialog for deleting Folder*/}
    </Drawer>
  );
}

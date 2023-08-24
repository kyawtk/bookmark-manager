import { BookMarkContext } from "../context/Bookmark";
import { useContext, useState } from "react";
import { List, Typography } from "@mui/material";
import useSWR, { mutate } from "swr";
import BookMarkListItem from "./ListItem";
import { useParams } from "react-router-dom";
import { fetcher } from "../utils/fetcher";
import Spinner from "./Spinner";
import { Box } from "@mui/material";
import Navbar from "./AppBar";
import axios from 'axios'
const BookMarkList = () => {
  const { folderId } = useParams();
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const handleCheck = (checked, _id) => {
    if (checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, _id]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((id) => id !== _id)
      );
    }
  };
  const {
    data: folder,
    error,
    isLoading,
  } = useSWR("http://localhost:4000/folders/" + folderId, fetcher);

  const refresh = () => {
    mutate("http://localhost:4000/folders/" + folderId);
  };

  const deleteBookmarks = () => {
 
    axios.delete("http://localhost:4000/bookmarks/",{data: {ids: selectedItems }}).then(res=>{
      
      refresh()
      setSelectedItems([])
    });
   
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "primary", minHeight: "100vh" }}>
      <Navbar refresh={refresh} folder={folder} deleteBookmarks={deleteBookmarks} selected={selectedItems.length > 0} />
      <List component={"nav"}>
        {isLoading && <Spinner message="" />}
        {error && <Typography>Error</Typography>}
        {folder?.bookmarks &&
          folder?.bookmarks.map((bm) => {
            return (
              <BookMarkListItem
                refresh={refresh}
                key={bm._id}
                bm={bm}
                handleCheck={handleCheck}
              ></BookMarkListItem>
            );
          })}
      </List>{" "}
    </Box>
  );
};

export default BookMarkList;

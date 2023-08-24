import { BookMarkProvider } from "./context/Bookmark";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import BookMarkList from "./components/List";
import SideBar from "./components/Sidebar";
import { Box, Container, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function App() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <BookMarkProvider>
          <CssBaseline></CssBaseline>
         
            <Box display={"flex"}>
              <SideBar></SideBar>
              <Routes>
                <Route path="/" element={<Home></Home>} />
                <Route path={`/:folderId`} element={<BookMarkList></BookMarkList>} />
              </Routes>
            </Box>
          
        </BookMarkProvider>
      </ThemeProvider>
    </div>
  );
}

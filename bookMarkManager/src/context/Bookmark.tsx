import { createContext } from "react";
import { useState } from "react";

export const BookMarkContext = createContext<any>("");

export function BookMarkProvider({ children }) {
  const [bookMarks, setBookMarks] = useState([]);
  const [folders, setFolders] = useState([])
  return (
    <BookMarkContext.Provider value={{bookMarks,folders, setFolders, setBookMarks}}>
      {children}
    </BookMarkContext.Provider>
  );
}

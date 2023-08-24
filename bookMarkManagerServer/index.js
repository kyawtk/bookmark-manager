import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import folderRoutes from './routes/folderRoutes.js'
import bookmarkRoutes from './routes/bookmarkRoutes.js'
import { notFound, errorHandler } from "./middleWares/errorHandler.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173",credentials: true}));

app.use(express.urlencoded({ extended: true }));


//routes
app.use('/folders' , folderRoutes)
app.use('/bookmarks' , bookmarkRoutes)



//default route
app.get("/", (req, res) => {
  res.json({ message: "success server setup" });
});

//error handlers
app.use(notFound);
app.use(errorHandler);

//starting server
let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyProfileController from "./controllers/MyProfileController";
import SearchController from "./controllers/SearchController";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));


const app = express();

app.use(cors());

app.use(express.json());


app.get('/api/profile',MyProfileController)
app.get('/api/search',SearchController.getSearches)


app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
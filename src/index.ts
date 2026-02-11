import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { movieRouter } from "./movies/routes.ts";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/movie", movieRouter);

mongoose
  .connect(
    "mongodb+srv://tumruu1999_db_user:lB9ey0anCeEPUjWE@cluster0.pk5bjjn.mongodb.net/sample_mflix",
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(3001, () => console.log("Server running on port 3000"));

import { Router, Request, Response } from "express";
import { Movies } from "./models";

export const movieRouter = Router();

movieRouter.get("/movies", async (req: Request, res: Response) => {
  const { genre } = req.query;

  const query = {} as any;

  if (genre) {
    query.genres = genre;
  }

  const movies = await Movies.find(query).limit(25);

  res.json(movies);
});
movieRouter.post("/addMovie", async (req: Request, res: Response) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const movie = new Movies(req.body);

    const savedMovie = await movie.save();

    console.log("SAVED:", savedMovie);

    res.status(201).json(savedMovie);
  } catch (err) {
    console.error("SAVE ERROR:", err);
  }
});

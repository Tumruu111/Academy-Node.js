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
movieRouter.post("/addMovies", async (req: Request, res: Response) => {
  const { title, poster, plot, year } = req.body;
  const movie = await Movies.insertOne({ title, plot, poster, year });
  res.send(movie);
});

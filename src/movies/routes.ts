import { Router, Request, Response } from "express";
import { Movies, Comments } from "./models";
import { Types } from "mongoose";

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

movieRouter.get(
  "/movies/:movieId/comments",
  async (req: Request, res: Response) => {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ message: "Invalid movie id" });
    }
    const comments = await Comments.find({
      movie_id: new Types.ObjectId(movieId),
    });

    res.json(comments);
  },
);

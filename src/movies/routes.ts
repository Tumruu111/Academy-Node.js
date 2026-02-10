import { Router, Request, Response } from "express";
<<<<<<< HEAD
import { Movies, Comments } from "./models";
import { Types } from "mongoose";
=======
import { Movies } from "./models";
>>>>>>> 94dbd65fb92320ab3a7be57030ee085d566ef767

export const movieRouter = Router();

movieRouter.get("/movies", async (req: Request, res: Response) => {
  const { genre } = req.query;

  const query = {} as any;

  if (genre) {
    query.genres = genre;
  }

<<<<<<< HEAD
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
=======
  const movies = await Movies.find(query).limit(10);

  res.json(movies);
});

movieRouter.post("/addMovie", async (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ success: true });
});
>>>>>>> 94dbd65fb92320ab3a7be57030ee085d566ef767

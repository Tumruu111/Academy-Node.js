import { Router, Request, Response } from "express";
import { Movies, Comments } from "./models";
import { Types } from "mongoose";

export const movieRouter = Router();

movieRouter.get("/movies", async (req: Request, res: Response) => {
  try {
    const {
      genre,
      page = "1",
      limit = "10",
      sortBy = "title",
      order = "asc",
      search = "",
    } = req.query;

    const query: any = {};
    if (genre) {
      query.genres = genre;
    }

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    let sortOrder: number;
    if (order === "desc") {
      sortOrder = -1;
    } else {
      sortOrder = 1;
    }
    const movies = await Movies.find(query)
      .sort({ [sortBy as string]: sortOrder as 1 | -1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Movies.countDocuments(query);

    res.json({
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      movies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
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

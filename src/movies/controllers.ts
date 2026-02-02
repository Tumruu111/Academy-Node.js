import { Router, Request, Response } from "express";
import { Movies } from "./models";

export const movieRouter = Router();

export const putMovieService = async (req: Request, res: Response) => {
  const movie = await Movies.insertOne({
    plot: "In the Bronx in 1962, Italian American bouncer Tony Lip searches for new employment while the Copacabana is closed for renovations.",
    title: "Green book",
    genres: ["Comedy", "Drama"],
    year: 2018,
    runtime: 12,
    directors: ["Peter Farrelly"],
    cast: ["Viggo Martensen", "Mahershala Ali"],
    released: 11 / 9 / 2018,
    fullpolt:
      " He is invited to an interview with Don Shirley, an African American pianist in need of a driver for his eight-week concert tour through the Midwest and Deep South.",
    awards: {
      wins: 58,
      nominations: 123,
      text: "58 wins 123 nominations",
    },
    imdb: {
      rating: 8.2,
      votes: 666000,
    },
    languages: ["English"],
    poster: "GREEN BOOK",
  });
  res.send(movie);
};
export const updateIMDbService = async (req: Request, res: Response) => {
  const { title, imdb } = req.body;
  const update = await Movies.updateOne(
    { title: title },
    { $set: { "imdb.rating": imdb } },
  );
  res.send(update);
};
export const updateGenreService = async (req: Request, res: Response) => {
  const { title, genre } = req.body;
  const update = await Movies.updateOne(
    { title: title },
    { $push: { genres: genre } },
  );
  res.send(update);
};
export const deleteMovieService = async (req: Request, res: Response) => {
  const title = req.body.title;
  const deleteMovie = await Movies.deleteOne({ title: title });
  res.send(deleteMovie);
};
export const updateByYearService = async (req: Request, res: Response) => {
  const { year } = req.body;
  const updateByYear = await Movies.updateMany(
    { year: year },
    { $inc: { "imdb.rating": 0.5 } },
  );
  res.send(updateByYear);
};
export const getMovies = async (req: Request, res: Response) => {
  const movies = await Movies.find({}).limit(10);
  res.send(movies);
};

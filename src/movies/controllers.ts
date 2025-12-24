import { Router, Request, Response } from "express";
import { Movies } from "./models";

export const movieRouter = Router();

export const putMovieService = async (req: Request, res: Response) => {
  const movie = await Movies.insertOne({
    plot: "In the Bronx in 1962, Italian American bouncer Tony Lip searches for new employment while the Copacabana is closed for renovations.",
    title: "Green book",
    genre: ["Comedy", "Drama"],
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
    languages: ["English"],
    poster: "GREEN BOOK",
  });
  res.send(movie);
};

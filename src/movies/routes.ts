import { Router } from "express";
import {
  deleteMovieService,
  putMovieService,
  updateByYearService,
  updateGenreService,
  updateIMDbService,
} from "./controllers";

export const movieRouter = Router();

movieRouter.post("/putMovies", putMovieService);
movieRouter.put("/updateIMDB", updateIMDbService);
movieRouter.put("/updateGenre", updateGenreService);
movieRouter.delete("/deleteMovie", deleteMovieService);
movieRouter.put("/updateByYear", updateByYearService);

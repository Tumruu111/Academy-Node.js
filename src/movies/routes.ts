import { Router } from "express";
import { putMovieService } from "./controllers";

export const movieRouter = Router();

movieRouter.post("/putMovies", putMovieService);

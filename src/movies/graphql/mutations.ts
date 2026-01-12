import { type IContext } from "../../index.ts";
import { Comments, Movies, Users } from "../db/models.ts";
import { type IMovie } from "../types/movies.ts";
import { type IUser, type IComment } from "../types/users.ts";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

export const movieMutations = {
  addMovie: async (_root: any, { input }: { input: IMovie }) => {
    const movie = await Movies.insertOne({});
    return movie;
  },
};
export const userMutations = {
  signup: async (_root: any, { input }: { input: IUser }) => {
    const { email, name, password } = input;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.insertOne({
      email,
      name,
      password: hashedPassword,
    });
    return user;
  },
  login: async (_root: any, { input }: { input: IUser }) => {
    const { email, password } = input;
    const user = await Users.findOne({ email });
    if (!user) {
      return "email not found";
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return "invalid  password";
    }
    const token = jwt.sign(
      {
        email: user.email,
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );
    return token;
  },
  userAddMovie: async (
    _root: any,
    { input }: { input: IMovie },
    { user }: IContext
  ) => {
    if (!user) {
      return "Token is missing!";
    }
    const { title, directors, year, poster, fullplot, plot, runtime } = input;
    const movie = await Movies.insertOne({
      title,
      directors,
      year,
      fullplot,
      plot,
      runtime,
      poster,
      userId: user.id,
    });
    return "Movie added successfully";
  },
  userDeleteMovie: async (
    _root: any,
    { input }: { input: { title: string } },
    { user }: IContext
  ) => {
    const { title } = input;
    if (!user) {
      return "Authentication required";
    }
    const result = await Movies.findOneAndDelete({
      title: title,
    });
    if (!result) {
      return "Movie not found";
    }
    return "Movie deleted successfully";
  },
};
export const commentMutations = {
  addComment: async (_root: any, { input }: { input: IComment }) => {
    await Comments.create({
      name: input.name,
      email: input.email,
      movie_id: input.movie_id,
      text: input.text,
      date: new Date(),
    });
    return "Added comment";
  },
  removeComment: async (
    _root: any,
    { input }: { input: { movie_id: string } },
    { user }: IContext
  ) => {
    const { movie_id } = input;
    if (!user) {
      return "Token required!";
    }
    const result = await Comments.findOneAndDelete({});
  },
};

import { type IContext } from "../../index.ts";
import { Movies, Users } from "../db/models.ts";
import { type IMovie } from "../types/movies.ts";
import { type IUser } from "../types/users.ts";
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
      return "invalid email or password";
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return "invalid email or password";
    }
    const token = jwt.sign(
      {
        name: user.name,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return "Login successful";
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
    });
    return "Movie added successfully";
  },
  userDeleteMovie: async (
    _root: any,
    { title }: { title: string },
    { user }: IContext
  ) => {
    if (!user) {
      throw new Error("Authentication required");
    }

    // 🗑️ Delete movie by title
    const result = await Movies.findOneAndDelete({
      title: title,
    });

    if (!result) {
      throw new Error("Movie not found");
    }

    return "Movie deleted successfully";
  },
};

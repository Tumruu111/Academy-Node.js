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
    return "Success";
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
    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) {
      return "invalid username or password";
    }
    const token = jwt.sign(
      {
        name: user.name,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return token;
  },
  userAddMovie: async (
    _root: any,
    { input }: { input: IMovie },
    { user }: IContext
  ) => {
    if (!user) {
      return "token missing";
    }

    const { title, directors, year } = input;

    const movie = await Movies.insertOne({
      title,
      directors,
      year,
    });
    return movie;
  },
};

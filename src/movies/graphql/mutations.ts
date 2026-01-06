import { Movies, Users } from "../db/models.ts";
import { type IMovie } from "../types/movies.ts";
import { type IUser } from "../types/users.ts";

export const movieMutations = {
  addMovie: async (_root: any, { input }: { input: IMovie }) => {
    const movie = await Movies.insertOne({});
    return "Success";
  },
};
export const userMutations = {
  signup: async (_root: any, { input }: { input: IUser }) => {
    const { email, name, password } = input;
    const user = await Users.insertOne({ email, name, password });
    return user;
  },
};

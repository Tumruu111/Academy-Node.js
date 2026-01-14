import { type IContext } from "../../index.ts";
import { Poll, Vote, User } from "../db/models.ts";
import { type IVote } from "../types/votes.ts";
import { type IUser } from "../types/users.ts";
import { type IPoll } from "../types/polls.ts";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

export const pollQueries = {
  allPolls: async (_root: any, { user }: IContext) => {
    if (!user) {
      throw new Error("Token required!");
    }
    const seePolls = await Poll.find();
    return seePolls;
  },
};

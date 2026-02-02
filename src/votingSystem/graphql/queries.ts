import { type IContext } from "../../index.ts";
import { Poll, Vote, User } from "../db/models.ts";
import { type IVote } from "../types/votes.ts";
import { type IUser } from "../types/users.ts";
import { type IPoll } from "../types/polls.ts";
import { Types } from "mongoose";

export const pollQueries = {
  allPolls: async (_root: any, args: undefined, { user }: IContext) => {
    console.log(user);
    if (!user) {
      throw new Error("Token required!");
    }
    if (user.role !== 0) {
      throw new Error("Admin access required!");
    }
    const seePolls = await Poll.find({});
    return seePolls;
  },

  votes: async (_parent: undefined, { pollId }: { pollId: string }) => {
    const votes = await Vote.aggregate([
      {
        $match: {
          poll_id: { $eq: new Types.ObjectId(pollId) },
        },
      },
      {
        $group: {
          _id: "$answer",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          answer: "$_id",
          count: 1,
        },
      },
    ]);

    return votes;
  },
};

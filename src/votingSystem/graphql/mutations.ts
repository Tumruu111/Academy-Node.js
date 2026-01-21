import { type IContext } from "../../index.ts";
import { Poll, Vote, User } from "../db/models.ts";
import { type IVote } from "../types/votes.ts";
import { type IUser } from "../types/users.ts";
import { type IPoll } from "../types/polls.ts";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

export const userMutations = {
  adminLogin: async (_root: any, { input }: { input: IUser }) => {
    const { email, password } = input;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role !== 0) {
      throw new Error("Not admin");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "2h" },
    );

    return token;
  },
  login: async (_root: any, { input }: { input: IUser }) => {
    const { email, password } = input;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return "email not found";
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return "invalid  password";
    }
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "2h" },
    );
    return token;
  },
};
export const pollMutations = {
  createPoll: async (
    _root: any,
    { input }: { input: IPoll },
    { user }: IContext,
  ) => {
    if (!user) {
      throw new Error("Token required");
    }
    if (user.role !== 0) {
    }
    try {
      const userPoll = await Poll.create({
        poll: input.poll,
        options: input.options,
      });
      console.log("Created poll:", userPoll);
      return userPoll;
    } catch (error) {
      throw new Error("Failed to create poll");
    }
  },
};
export const voteMutations = {
  userVote: async (
    _root: any,
    { input }: { input: IVote },
    { user }: IContext,
  ) => {
    if (!user) {
      throw new Error("Token required!");
    }
    const vote = await Vote.findOne({
      poll_id: input.poll_id,
      user_id: input.user_id,
    });
    if (vote) {
      throw new Error("Already voted");
    }
    const userVote = await Vote.insertOne({
      answer: input.answer,
      poll_id: input.poll_id,
      user_id: input.user_id,
    });

    return userVote;
  },
};

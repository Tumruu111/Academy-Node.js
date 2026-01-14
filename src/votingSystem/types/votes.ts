import { Types, Document } from "mongoose";

export interface IVote {
  answer: string;
  user_id: Types.ObjectId;
  poll_id: Types.ObjectId;
}

export interface IVotesDocument extends IVote, Document {}

import { Document, Types } from "mongoose";

export interface IPoll {
  poll: string;
  user_id: Types.ObjectId;
  options: string[];
}

export interface IPollsDocument extends IPoll, Document {}

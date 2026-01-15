import { Schema, model } from "mongoose";
import { type IVotesDocument } from "../types/votes.ts";
import { type IPollsDocument } from "../types/polls.ts";
import { type IUsersDocument } from "../types/users.ts";

const UserSchema = new Schema<IUsersDocument>({
  name: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
});

export const User = model<IUsersDocument>("User", UserSchema);

const PollSchema = new Schema<IPollsDocument>(
  {
    poll: { type: String, required: true },
    options: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export const Poll = model<IPollsDocument>("Poll", PollSchema);

const VoteSchema = new Schema<IVotesDocument>({
  answer: { type: String, required: true },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  poll_id: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },
});
export const Vote = model<IVotesDocument>("Vote", VoteSchema);

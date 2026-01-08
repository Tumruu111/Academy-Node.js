import { Document } from "mongoose";
export interface IUser {
  name: string;
  email: string;
  password: string;
}
export interface IUsersDocument extends IUser, Document {}
export interface IComment {
  name: string;
  email: string;
  movie_id: string;
  text: string;
  date: Date;
}
export interface ICommentDocument extends IComment, Document {}

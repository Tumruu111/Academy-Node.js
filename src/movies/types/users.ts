import { Document } from "mongoose";
export interface IUser {
  name: String;
  email: string;
  password: string;
}
export interface IUsersDocument extends IUser, Document {}

import { Document } from "mongoose";
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: number;
}
export interface IUsersDocument extends IUser, Document {}

import express from "express";
import { bankRouter } from "./routers/bank.js";
import { userRouter } from "./routers/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(cors());

app.use(express.json()); 

app.use(cookieParser());

app.use("/", (req, res, next) => {
  const user = req.cookies.user;
  req.user = user;
});

app.use(express.static)

app.use("/bank", bankRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("3000");
});

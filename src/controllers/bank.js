import { BankService } from "../services/bank.js";
import fs from "fs/promises";

export const loadBalance = (req, res) => {
  const userBalance = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
  const aa = new BankService();
  res.send(aa.checkBalance());
};

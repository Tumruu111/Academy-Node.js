import { BankService } from "../services/bank.js";
import fs from "fs/promises";
import { users } from "../data/users.json";

export const loadBalance = async (req, res) => {
  const userId = req.userId;
  const userBalance = await fs.readFile(users);
  try {
    const aa = new BankService();

    res.send(aa.checkBalance());
  } catch (e) {
    res.status(500).send(e.message);
  }
};

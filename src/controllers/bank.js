import { BankService } from "../services/bank.js";

export const loadBalance = async (req, res) => {
  const userId = req.userId;

  try {
    const aa = new BankService();

    res.send(aa.checkBalance());
  } catch (e) {
    res.status(500).send(e.message);
  }
};

import fs from "node:fs/promises";
export class BankService {
  checkBalance() {
    const user = fs.readFile("src/data/users.json", "utf-8");
    return user;
  }
}
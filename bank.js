import inquirer from "inquirer";
import fs from "node:fs/promises";

export const bankAnswer = async (users, user) => {
  const { bankOption } = await inquirer.prompt([
    {
      type: "select",
      name: "bankOption",
      message: "Login Or Signup",
      choices: [
        { name: "Deposit", value: "deposit" },
        { name: "Withdraw", value: "withdraw" },
        { name: "History", value: "history" },
        { name: "Check balance", value: "check-balance" },
        { name: "Transaction", value: "transaction" },
        { name: "Exit", value: "exit" }
      ]
    }
  ]);

  switch (bankOption) {
    case "deposit":
      await deposit(users, user);
      break;
    case "withdraw":
      await withdraw(users, user);
      break;
    case "history":
      await history(users, user);
      break;
    case "check-balance":
      await checkBalance(users, user);
      break;
    case "transaction":
      await transaction(users, user);
      break;
    case "exit":
      process.exit();
  }
};

const updateUser = async (users, user, amount, type) => {
  const userData = JSON.stringify(users);

  await fs.writeFile("users.json", userData, "utf-8");

  const historyRawData = await fs.readFile("history.json", "utf-8");
  const history = JSON.parse(historyRawData);

  const userHistories = history[user.username] || [];

  userHistories.push({
    type,
    amount,
    balance: user.balance
  });

    history[user.username] = userHistories;

    const historyData = JSON.stringify(history);

    await fs.writeFile("history.json", historyData, "utf-8");
  console.log("Tanii dansnii uldegdel:", user.balance);

  return;
};

const deposit = async (users, user) => {
  let balance = parseInt(user.balance) || 0;

  const { amount } = await inquirer.prompt([
    {
      type: "number",
      name: "amount",
      message: "Hediin orlogo hiih we?"
    }
  ]);

  balance = balance + amount;

  user.balance = balance;

  return await updateUser(users, user, amount, "deposit");
};

const withdraw =  async (users, user) => {
    let balance = parseInt(user.balance) || 0;


    const { amount } = await inquirer.prompt([
        {
            type: "number",
            name: "amount",
            message: "Hediin zarlaga avah ve?"
        }
    ]);

    balance = balance - amount;

    user.balance = balance;
    
    return await updateUser(users, user, amount, "withdraw");
};

const history = async (users, amount, type, user) => {
    const historyRawData = await fs.readFile("history.json", "utf-8");
    const history = JSON.parse(historyRawData);

    const userHistories = history[user.balance, user.type, user.amount] || [];
    history[user.username] = userHistories;
    console.log("Tanii history", userHistories);

};

const checkBalance = async (user) => {
    let userBalance = parseInt(user.balance);

    await fs.readFile("history.json", "utf-8");
    
    
};

const transaction = (users, user) => {
  
}
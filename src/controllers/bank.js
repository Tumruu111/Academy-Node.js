import {
  createAccountService,
  deleteAccountServices,
  getAccountByNumberServices,
  getAllAccountsServices,
  updateAccountServices,
} from "../services/bank.js";
export const createAccount = async (req, res) => {
  const { user_id, account_number, balance } = req.body;
  const account = await createAccountService(user_id, account_number, balance);

  res.json({ account });
};

// Дансны мэдээллийг шинэчлэх
export const updateAccount = async (req, res) => {
  const { userid, account_number, balance } = req.body;
  const accountUpdate = await updateAccountServices(
    userid,
    account_number,
    balance
  );
  res.json({ accountUpdate });
};

// Данс устгах
export const deleteAccount = async (req, res) => {
  const { userid } = req.body;
  const deletedAccount = await deleteAccountServices(userid);
  res.json({ deletedAccount });
};

// Бүх дансыг авах
export const getAllAccounts = async (req, res) => {
  // Хэрвээ хэрэглэгчээр шүүх бол:
  const { userid } = req.body;
  const userAccount = await getAllAccountsServices(userid);
  res.json({ userAccount });
};

// данс авах
export const getAccountByNumber = async (req, res) => {
  const { number } = req.body;
  const accountNumber = await getAccountByNumberServices(number);
  res.json({ accountNumber });
};

// Шинэ гүйлгээ үүсгэх

export const createTransaction = async (req, res) => {
  const { user_id, amount, transaction_type } = req.body;
  const transaction = await createTransaction(
    user_id,
    amount,
    transaction_type
  );
  res.json(transaction);
};

// Бүх гүйлгээ авах

export const getTransactions = async (req, res) => {
  const { user_id } = req.query;
  const transactions = await getTransactions(user_id);
  res.json(transactions);
};

// Хэрэглэгчээр гүйлгээ авах

export const getTransactionsByUserId = async (req, res) => {
  const { user_id } = req.query;
  const transactions = await getTransactionsByUserId(user_id);
  res.json(transactions);
};

export const getTransactionsByAccountNumber = async (req, res) => {
  const { account_number } = req.query;
  const transactions = await getTransactionsByAccountNumber(account_number);
  res.json(transactions);
};

export const deleteTransaction = async (req, res) => {};

export const updateTransaction = async (req, res) => {};

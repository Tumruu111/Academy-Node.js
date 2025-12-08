import { db } from "../db.js";

export const createAccountService = async (userid, number, balance) => {
  const response = await db.query(
    `INSERT INTO account (userid, number, balance) VALUES ($1, $2, $3) RETURNING *`,
    [userid, number, balance]
  );
  return response.rows[0];
};
export const updateAccountServices = async (
  userid,
  account_number,
  balance
) => {
  const response = await db.query(
    `UPDATE account SET number = ${account_number}, balance = ${balance} WHERE userid = ${userid} RETURNING *`
  );
  return response.rows[0];
};
export const deleteAccountServices = async (userid) => {
  console.log(userid, "asdasd");
  const response = await db.query(
    `DELETE FROM account WHERE userid = ${userid} RETURNING * `
  );
  return response.rows[0];
};
export const getAllAccountsServices = async (userid) => {
  const response = await db.query(
    `SELECT * FROM account WHERE userid = ${userid}`
  );
  return response.rows;
};
export const getAccountByNumberServices = async (number) => {
  const response = await db.query(
    `SELECT * FROM account WHERE number = ${number}`
  );
  return response.rows[0];
};

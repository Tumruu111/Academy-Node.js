import fs from "node:fs/promises";
import path from "path";
export const login = async (req, res) => {
  const filePath = path.join("../../data/users.json");
  const username = req.body.username;
  const password = req.body.password;
  const userData = await fs.readFile(filePath, "utf-8");
  if ((userData.username === username, userData.password === password)) {
    console.log("amjilttai!");
  }

  res.cookie("user", JSON.stringify({ username }), {
    httpOnly: true,
    secure: false,
  });

  res.json({ message: "Logged in", user: { username } });
};

export const logout = (req, res) => {
  res.clearCookie("user");
  res.send("Success!");
};

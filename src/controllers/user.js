import fs from "fs";
export const login = (req, res) => {
  const { username, password } = req.body;
  const userData = JSON.parse(fs.readFileSync("data/users.json"));
  if (userData.username === username && userData.password === password) {
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

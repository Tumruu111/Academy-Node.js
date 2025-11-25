export const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password
  res.cookie("user", username, {
    httpOnly: true,
    secure: false
  });
  res.json({
  });
};
export const logout = (req, res) => {
  res.clearCookie("user");
  res.send("Success!");
};
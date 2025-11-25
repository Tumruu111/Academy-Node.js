export const login = (req, res) => {
  res.cookie(req.username, req.password, {
    httpOnly: true,
    secure: false
  });
  res.json({
    user: req.username
  });
};

export const logout = (req, res) => {
  res.clearCookie("user");

  res.send("Success!");
};
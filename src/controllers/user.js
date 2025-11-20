import users from "../data/users.json" with {type: "json"};
export const login = (req, res) => {
  const username = req.body.username
  const password =req.body.password
  const user = users.find(value => {
    return value.username === username && value.password === password;
  });
    res.send("success!");
   if (!user) {
    console.log("username eswel password buruu bn!");
   }
};
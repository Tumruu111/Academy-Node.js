import express from "express";
import fs from "node:fs/promises";

const app = express();

app.use(express.json());

app.get("/get-user/:id", async (req, res) => {
  const { id } = req.params;
  const users = await fs.readFile("users.json").then(value => {
    return JSON.parse(value);
  });

  const user = users.find(value => {
    return value.id == id;
  });

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json(user);
});

app.get("/get-users", async (req, res) => {
  const { firstName, age } = req.query;

  const users = await fs.readFile("users.json").then(value => {
    return JSON.parse(value);
  });

  res.json(users);
});

app.post("/create-user", async (req, res) => {
  const userData =  { firstName, age } = req.query;

  await fs.writeFile("users.json", userData, "utf-8");

  res.send("Success");
});

app.put("/update-user/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.send("Success");
});

app.listen(3000, () => {
  console.log("3000");
});
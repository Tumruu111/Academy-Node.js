import express from "express";
import fs from "node:fs/promises";

const app = express();
app.use(express.json());

const usersFile = "users.json";

async function loadUsers() {
  const data = await fs.readFile(usersFile, "utf-8");
  return JSON.parse(data);
}

async function saveUsers(users) {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
}

app.get("/get-user/:id", async (req, res) => {
  const { id } = req.params;
  const users = await loadUsers();
  const user = users.find((u) => u.id == id);

  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

app.get("/get-users", async (req, res) => {
  const users = await loadUsers();
  res.json(users);
});

app.post("/create-user", async (req, res) => {
  const newUser = { id: Date.now().toString(), ...req.body };
  const users = await loadUsers();
  users.push(newUser);
  await saveUsers(users);
  res.status(201).json({ message: "User created", user: newUser });
});

app.put("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const users = await loadUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) return res.status(404).send("User not found");

  users[userIndex] = { ...users[userIndex], ...updateData };
  await saveUsers(users);

  res.status(200).json({
    message: "User updated successfully",
    user: users[userIndex],
  });
});

app.listen(3000);

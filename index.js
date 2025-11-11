import fs from "node: fs/promises";
import inquirer from "inquirer";

getUsers = async () => {
  const users = await fs.readFile("users.json","utf-8")
}

const { auth } = await prompt([
  {
    type: "selet",
    name: "auth",
    message: "Login or Signup",
    choices: ["Login", "Signup"]

  }
]);

if (auth === "Login"){
  const { username, password } = await inquirer.prompt([
   {
    type: "input",
    name: "username",
    message: "Username oruulna uu"
   }
   {
    type: "input",
    name: "password",
    message: "Password oruulna uu"
   }
  ]);
}else{
  console.log
}

const users = await getUsers();

const user = users.find(value => {
  return value.username === username && value.password === password;
});

if (!user){
  console.log("Username, Password buruu bn!")
}




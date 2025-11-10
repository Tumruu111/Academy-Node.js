import fs, { read } from "fs";
import readline from "readline";
import { start } from "repl";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readUsers() {
  if (!fs.existsSync("users.txt")) return [];

  const data = fs.readFileSync("users.txt", "utf-8").trim();

  return data.split("\n").map((line) => {

    const [username, pin, balance] = line.split(",");
    return { username, pin, balance: parseInt(balance) };
  });
}
function writeUsers(users) {
  const line = users.map((u) => ` ${u.username}, ${u.pin}, ${u.balance}`);

  fs.writeFileSync("users.txt", line.join(" \n "));
};
function logTransaction() {
  if (!fs.existsSync("transaction.txt")) return[];

  const data = fs.readFileSync("transaction.txt", "utf-8").trim();

  return data.split("\n").map((line) => {

    const [username, type, amount] = line.split(",");
    return {username, type, amount};
  });
}
function readTransaction(transactions){
  const line = transaction.map((t) => `${t.username}, ${t.type}, ${t.amount}`);
  fs.writeFileSync("transaction.txt", line.join("/n"));
};

function register() {
  const user = readUsers();

  rl.question("Нэвтрэх нэрээ оруулна уу", (username) => {
    rl.question("password ", (pin) => {
      rl.question("balance", (balance) => {
        const newUser = { username, pin, balance };
        user.push(newUser);
        writeUsers(user);
      });
    });
  });
}

function login() {
      const user = readUsers();
  console.log(
    " ==== ATM MENU ====   1. Үлдэгдэл шалгах 2. Мөнгө нэмэх  3. Мөнгө авах 4. Гарах ",
  );


    rl.question("Нэвтрэх нэрээ оруулна уу?", (username) => {
    rl.question("Password оруулна уу? ", (pin) => {
        

       for (const element of user) {
      
         if(username === element.username && pin === element.pin){
              console.log("Амжилттай нэвтэрлээ!")
             showMenu()

         }else{
            console.log("Бүртгэлгүй байна!");
         
         }
            
         } 
  
    });
  });
};

function showMenu() {
    const user = readUsers ();
    const transaction = readTransaction();
    console.log( "1. Үлдэгдэл шалгах  2. Мөнгө нэмэх 3. Мөнгө авах 4. Гарах ")
    rl.question("Үйлдэлээ сонгоно уу?:", (startChoice) => {
        if(startChoice === "1"){
           console.log( user.map( ({ username, balance }) => ({ username, balance }) ) )
            showMenu();
        } else if (startChoice === "2"){
            rl.question("Мөнгөн дүнгээ оруулна уу?:", (depositAmount) => {
               console.log( user.map( ({ username, balance })))
            });
        }
        const newTransaction = { username, type, amount }; 
        transactions.push (newTransaction);
        logTransaction(transaction)
    }
)};


console.log("==== ATM SYSTEM ====  1. Нэвтрэх 2. Бүртгүүлэх ");

rl.question("Сонголтоо оруулна уу: ", (startChoice) => {
  if (startChoice === "1") {
    login();
  } else if (startChoice === "2") {
    register();
  } else {
    console.log("⚠️ Буруу сонголт!");
    rl.close();
  }
});
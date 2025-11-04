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
}

// logTransaction(): transactions.txt-д бичих
function logTransaction(username, type, amount) {
  // 👉 Гүйлгээний лог бичих код
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


    rl.question("Нэвтрэх нэрээ оруулна уу", (username) => {
    rl.question("password ", (pin) => {
        

       for (const element of user) {
      
         if(username === element.username && pin === element.pin){
              console.log("Amjilttai nevterlee")
             showMenu()

         }else{
            console.log("bvrtgelgui bna");
         
         }
            
         } 
  
    });
  });
};

function showMenu() {
    const user = readUsers ();
    console.log( "1. Үлдэгдэл шалгах  2. Мөнгө нэмэх 3. Мөнгө авах 4. Гарах  Хэрэглэгчийн сонголтоор switch case ашиглах ")
    rl.question("Uildelee songono uu?:", (startChoice) => {
        if(startChoice === "1"){
           console.log( user.map( ({ username, balance }) => ({ username, balance }) ) );
        } else if (startChoice === "2"){
            rl.question("Mungun dungee oruulna uu?:", (deposit()))

        }
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
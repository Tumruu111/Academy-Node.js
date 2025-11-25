const addBtn = document.getElementById("submit");

const addBtnFunc = async () => {
  const usernameElement = document.getElementById("username");
  const passwordElement = document.getElementById("password");


  const username = usernameElement.value;
  const password = passwordElement.value;
 const response = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
};
addBtn.addEventListener("click", addBtnFunc);
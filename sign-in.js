const loginButton = document.getElementById("login-button");

loginButton.addEventListener('click', updateName);


const storage = window.localStorage;

//only running updateName once when we click buttonm and the script is ran twice which resets everything
async function updateName() {
    console.log("updateName");
    let output = "";
    let apiLink = "http://localhost:8080/login/" + document.getElementById("username").value + "/";
    const response = await fetch(apiLink);
    //check if the response was a success
    if (response.ok) {
        const userJSON = await response.json();
        output = userJSON; //what the endpoint responds with (should be JSON)
        console.log("success");
    } else {
        //report error if you cant reach the api
        console.log("fail");
        output = "fail";
    }
    const name = output["name"]; //get name value from output
  
    storage.setItem(name, name);
    console.log("name added to localstorage: " + name);
    
    
}
//./home.html
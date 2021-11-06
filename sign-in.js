const loginButton = document.getElementById("login-button");
loginButton.addEventListener('click', (async () => await updateName()));

async function updateName() {
    let output = "";
    let apiLink = "http://localhost:8080/login/" + document.getElementById("username").value + "/";
    const response = await fetch(apiLink);
    //check if the response was a success
    if (response.ok) {
        const userJSON = await response.json();
        output = userJSON;
    } else {
        //report error if you cant reach the api
        output = "fail";
    }
    const name = output["name"];
    const storage = window.sessionStorage;
    //if the name is not already stored in the local session
    if (storage.getItem("name") === null) {
        storage.setItem("name", name);
    }
    console.log("success");
}

//./home.html


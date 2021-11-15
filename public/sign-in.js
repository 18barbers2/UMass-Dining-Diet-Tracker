'use strict';

const loginButton = document.getElementById("login-button");
loginButton.addEventListener('click', updateName);

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
    const storage = window.localStorage;
    storage.setItem("user", JSON.stringify(output));
    window.location.href = '/home';
}

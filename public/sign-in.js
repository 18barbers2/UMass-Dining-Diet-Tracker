'use strict';

const loginButton = document.getElementById("login-button");
loginButton.addEventListener('click', () => loginUser());

// const loginButton = document.getElementById("login-button");
// loginButton.addEventListener('click', updateName);

// async function updateName() {
//     let output = "";
//     let apiLink = "http://localhost:8080/login/" + document.getElementById("username").value + "/";
//     const response = await fetch(apiLink);
//     //check if the response was a success
//     if (response.ok) {
//         const userJSON = await response.json();
//         output = userJSON;
//     } else {
//         //report error if you cant reach the api
//         output = "fail";
//     }
//     const storage = window.localStorage;
//     storage.setItem("user", JSON.stringify(output));
//     window.location.href = '/home';
// }

async function loginUser() {

    const emailAddress = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const credentials = JSON.stringify({email: emailAddress, password: password});
    
    const endpoint = `/sign-in`;

    const response = await fetch(endpoint, {
        method: 'POST',
        body: credentials,
        headers: {'Content-Type': 'application/json'}
    });

    alert(response.ok);
    if(response.ok) {
        window.location.href = "/home";
        const userJSON = await response.json();
        const userEmail = userJSON["email"];

        const storage = window.localStorage;
        storage.setItem("userEmail", userEmail);
    }
    else {
        window.location.href = "/sign-in";
    }
    //console.log(response);
}


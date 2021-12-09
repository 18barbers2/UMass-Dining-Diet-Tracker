'use strict';

const loginButton = document.getElementById("login-button");
loginButton.addEventListener('click', () => loginUser());

async function loginUser() {

    const emailAddress = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const credentials = JSON.stringify({email: emailAddress, password: password});
    
    const endpoint = `/sign-in`;

    const file = await fetch(endpoint, {
        method: 'POST',
        body: credentials,
        headers: {'Content-Type': 'application/json'}
    });
    window.location = file.url;
    console.log(file.url);
}


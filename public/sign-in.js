'use strict';

const loginButton = document.getElementById("login-button");
loginButton.addEventListener('click', () => loginUser());

async function loginUser() {

    const emailAddress = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    //check to make sure fields are not empty
    if (emailAddress && password) {
        const credentials = JSON.stringify({email: emailAddress, password: password});

        const endpoint = `/sign-in`;

        const file = await fetch(endpoint, {
            method: 'POST',
            body: credentials,
            headers: {'Content-Type': 'application/json'}
        });
        window.location = file.url;
        
    } else { //one or both of the fields is empty
        alert("One or more of the required fields is empty");
    }
}


'use strict';

const createAccountButton = document.getElementById("create-account-button");
createAccountButton.addEventListener("click", sendAccountData);

async function sendAccountData() {
    let apiLink = "http://localhost:8080/create/account";

    const accountInfo = getAccountInfo();

    const response = await fetch(apiLink , {
        method: 'POST',
        body: accountInfo,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });

    console.log(response.ok);
}

function getAccountInfo() {
    const firstName = document.getElementById("input-first-name").value;
    const lastName = document.getElementById("input-last-name").value;
    const email = document.getElementById("input-email").value;
    const username = document.getElementById("input-username").value;
    const password = document.getElementById("input-password").value;

    const accountJSON = {"firstName": firstName, "lastName": lastName, "email": email, "username": username, "password": password};
    return JSON.stringify(accountJSON);
}

'use strict';

async function sendAccountData() {
    let endpoint = `/create-account`;

    const accountInfo = getAccountInfo();
    console.log("SENDING ACCOUNT DATA");
    const response = await fetch(endpoint , {
        method: 'POST',
        body: accountInfo,
        headers: {
          'Content-Type': 'application/json'
        }
    });

    console.log(response.status);
    if(!response.ok) {
       alert("could not create account");
    } 
}

function getAccountInfo() {
    const firstName = document.getElementById("input-first-name").value;
    const lastName = document.getElementById("input-last-name").value;
    const email = document.getElementById("input-email").value;
    const username = document.getElementById("input-username").value;
    const password = document.getElementById("input-password").value;

    const accountJSON = {fname: firstName, lname: lastName, email: email, username: username, password: password};
    return JSON.stringify(accountJSON);
}

const createAccountButton = document.getElementById("create-account-button");
createAccountButton.addEventListener("click", () => sendAccountData());
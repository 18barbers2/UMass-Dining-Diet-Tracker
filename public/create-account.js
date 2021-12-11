'use strict';

const createAccountButton = document.getElementById("create-account-button");
createAccountButton.addEventListener("click", () => sendAccountData());

async function sendAccountData() {
    let endpoint = `/create-account`;

    const accountInfo = getAccountInfo();

    if (accountInfo !== '{}') { //checks if all the fields were entered correctly
        console.log("SENDING ACCOUNT DATA");
        const response = await fetch(endpoint , {
            method: 'POST',
            body: accountInfo,
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if (response.status < 300) {
            window.location = response.url;
        } else {
            alert("User already exists");
        }
    }

   
}

function getAccountInfo() {
    let accountJSON;

    const firstName = document.getElementById("input-first-name").value;
    const lastName = document.getElementById("input-last-name").value;
    const email = document.getElementById("input-email").value;
    const username = document.getElementById("input-username").value;
    const password = document.getElementById("input-password").value;
    const confirmPassword = document.getElementById("input-confirm-password").value;
    
    if (firstName && lastName && email && username && password && confirmPassword) { //check if all the input fields have been filled in
        if (isValidEmail(email)) { //check if the email input is a valid email address
            if (password === confirmPassword) { //check if the password and the confirmed password fields are the same
                accountJSON = {fname: firstName, lname: lastName, email: email, username: username, password: password};
            } else { //passwords do not match
                alert("password and confirm password do not match");
                accountJSON = {};
            }  
        } else {
            alert("Email provided is not valid");
            accountJSON = {};
        }
    } else { //not all of the forms have been filled out
        alert("One or more of the fields are empty");
        accountJSON = {};
    }

    return JSON.stringify(accountJSON);
}

//checks if email is a valid email using regex
function isValidEmail(email) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return email.match(emailRegex) !== null;
}
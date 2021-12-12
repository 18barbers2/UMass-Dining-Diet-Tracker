'use strict';
const resetPasswordButton = document.getElementById("reset-password");
resetPasswordButton.addEventListener('click', async () => sendReset());

async function sendReset() {
    
    const newPass = document.getElementById("new-password").value;
    const confirmNewPass = document.getElementById("confirm-new-password").value;
    
    if(newPass !== confirmNewPass){
        alert("Passwords do not match!");
        return;
    }
    if(newPass === "") {
        alert("Passwords cannot be empty!");
        return;
    }

    let endpoint = `/reset-password`;
    const data = JSON.stringify({newPassword: newPass, email: window.localStorage.getItem("userEmail")});
    const response = await fetch(endpoint , {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        alert("PASSWORD RESET");
        window.location = response.url;
    } else {
        alert("ERROR RESETTING PASSWORD");
    }
    window.localStorage.clear();

}

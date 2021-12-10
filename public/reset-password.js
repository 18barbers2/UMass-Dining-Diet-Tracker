'use strict';
const resetPasswordButton = document.getElementById("reset-password");
resetPasswordButton.addEventListener('click', async () => sendReset());

// window.addEventListener("load", () => {
//     console.log("WILL THIS THING BE HIDDEN?")
//     document.getElementById("password-form").style.display = "none";
// });

async function sendReset() {
    
    const newPass = document.getElementById("new-password").value;
    const confirmNewPass = document.getElementById("confirm-new-password").value;
    
    if(newPass !== confirmNewPass){
        alert("Passwords do not match!");
        return;
    }

    let endpoint = `/reset-password`;
    const data = JSON.stringify({newPassword: newPass});
    // console.log("SENDING ACCOUNT DATA");
    const response = await fetch(endpoint , {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
    });

    console.log(response.status);

    if(response.ok) {
        alert("PASSWORD RESET");
    } else {
        alert("ERROR RESETTING PASSWORD");
    }

}

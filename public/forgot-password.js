'use strict';

const forgotpasswordButton = document.getElementById("resetPassButton");
forgotpasswordButton.addEventListener("click", resetPassword);


function sendResetPassword() {


}
async function resetPassword() {
    let apiLink = `/delete/password`;

    const emailJSON = JSON.stringify({"email": document.getElementById("reset-email").value});

    const response = await fetch(apiLink , {
        method: 'POST',
        body: emailJSON,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });

    console.log(response.ok);
}

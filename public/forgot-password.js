'use strict';

const forgotPasswordButton = document.getElementById("reset-password");
forgotPasswordButton.addEventListener("click", async () => sendResetEmail());


async function sendResetEmail() {
  let endpoint = `/forgot-password`;
  let email = document.getElementById("reset-email").value;

  let securityCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  const data = JSON.stringify({email: email, secret: securityCode});
  console.log("SENDING ACCOUNT DATA");

  const response = await fetch(endpoint , {
      method: 'POST',
      body: data, 
      headers: {
        'Content-Type': 'application/json'
      }
  });
  if(data === undefined) {
    alert("COULD NOT SENT RESET EMAIL TO :" + data);
  }
  if(response.ok) {
    alert("RESET EMAIL SENT");
    window.location = response.url;
  }
  console.log(response.status);

}

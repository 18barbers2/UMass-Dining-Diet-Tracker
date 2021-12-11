'use strict';

const submitCode = document.getElementById("submit-code");
submitCode.addEventListener('click', async () => confirmCode());

async function confirmCode() {
    console.log("CODE SUBMITTED");
    const endpoint = '/reset-password/confirm';

    let code = document.getElementById("security-code").value;
    let email = window.localStorage.getItem("userEmail");

    let data = JSON.stringify({secret: code, email: email});

    const response = await fetch(endpoint , {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
    });

    console.log(response.status);
    if(response.ok){
        window.location = response.url;

    }
}

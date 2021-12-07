'use strict';
const restPasswordButton = document.getElementById("reset-password");
loginButton.addEventListener('click', () => loginUser());

function sendReset() {
    window.open('mailto:example@address.name');
}
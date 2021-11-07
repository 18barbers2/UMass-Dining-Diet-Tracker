window.addEventListener("load", loadName);

function loadName() {
    document.getElementById("welcomeMsg").innerText = `Welcome ${JSON.parse(window.localStorage.getItem("user"))["name"]}!`;
}
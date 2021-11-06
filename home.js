window.addEventListener("load", loadName);

function loadName() {
    document.getElementById("welcomeMsg").innerText = `Welcome ${window.sessionStorage.getItem("name")}!`;
}
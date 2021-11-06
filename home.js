//window.addEventListener("load", loadName);
window.addEventListener("load",loadGoals)

function loadName() {
    document.getElementById("welcomeMsg").innerText = `Welcome ${window.sessionStorage.getItem("name")}!`;
}

function loadGoals() {
    document.getElementById("calorie-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["calories"];
    document.getElementById("calorie-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["carbs"];
    document.getElementById("calorie-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["calories"];
    document.getElementById("calorie-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["calories"];
    document.getElementById("calorie-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["calories"];
}
window.addEventListener("load", () => {loadName(); loadGoals(); loadWeight();});
//const Plotly = require('plotly.js');

function loadName() {
    document.getElementById("welcomeMsg").innerText = `Welcome ${JSON.parse(window.localStorage.getItem("user"))["name"]}!`;
}

function loadGoals() {
    document.getElementById("calorie-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["calories"];
    document.getElementById("carbohydrate-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["carbs"];
    document.getElementById("protein-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["protein"];
    document.getElementById("fat-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["fat"];
    document.getElementById("sodium-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["sodium"];
    document.getElementById("sugar-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["sugar"];
    document.getElementById("cholesterol-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["cholesterol"];

    const test = document.getElementById("sugar-progress");
    test.style.setProperty("width","99%"); 
}

function loadWeight() {

    let canvas = document.getElementById("weight-chart");
    Plotly.newPlot(canvas,[{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }], {
        margin: { t: 0 } } );
}
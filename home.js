window.addEventListener("load", () => {loadName(); loadGoals(); loadWeight(); loadCalories;});
//const Plotly = require('plotly.js');

function loadName() {
    document.getElementById("welcomeMsg").innerText = `Welcome ${JSON.parse(window.localStorage.getItem("user"))["name"]}!`;
}

function loadGoals() {
    // document.getElementById("calorie-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["calories"];
    // document.getElementById("carbohydrate-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["carbs"];
    // document.getElementById("protein-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["protein"];
    // document.getElementById("fat-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["fat"];
    // document.getElementById("sodium-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["sodium"];
    // document.getElementById("sugar-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["sugar"];
    // document.getElementById("cholesterol-count").innerText = JSON.parse(window.localStorage.getItem("daily_goals"))["cholesterol"];

    // load progress bar
    const storage = window.localStorage;
    
    let calories = JSON.parse(storage.getItem("user"))["calories"];
    let calorieLimit = JSON.parse(storage.getItem("user"))["calorieLimit"];
    
    let fat = JSON.parse(storage.getItem("user"))["fats"];
    let fatLimit = JSON.parse(storage.getItem("user"))["fatLimit"];
    
    let protein = JSON.parse(storage.getItem("user"))["protein"];
    let proteinLimit = JSON.parse(storage.getItem("user"))["proteinLimit"];
    
    let sodium = JSON.parse(storage.getItem("user"))["sodium"];
    let sodiumLimit = JSON.parse(storage.getItem("user"))["sodiumLimit"];
    
    let sugar = JSON.parse(storage.getItem("user"))["sugar"];
    let sugarLimit = JSON.parse(storage.getItem("user"))["sugarLimit"];
    
    let carbs = JSON.parse(storage.getItem("user"))["carbs"];
    let carbsLimit = JSON.parse(storage.getItem("user"))["carbLimit"];
    
    let cholesterol = JSON.parse(storage.getItem("user"))["cholesterol"];
    let cholesterolLimit = JSON.parse(storage.getItem("user"))["cholesterolLimit"];
    
    //set progress bars
    let bar = document.getElementById("calorie-progress");
    let percentage = Math.floor(100 * (calories / calorieLimit));
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("carbs-progress");
    percentage = Math.floor(100 * (carbs / carbsLimit));
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("protein-progress");
    percentage = Math.floor(100 * (protein/proteinLimit));
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("fat-progress");
    percentage = Math.floor(100 * (fat / fatLimit));
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("sodium-progress");
    percentage = Math.floor(100 * (sodium / sodiumLimit));
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("sugar-progress");
    percentage = Math.floor(100 * (sugar / sugarLimit));
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("cholesterol-progress");
    percentage = Math.floor(100 * (cholesterol / cholesterolLimit));
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    let healthScore = Math.floor(Math.random()*10);
    document.getElementById("health-score").innerText = `Overall Healthiness Score: ${healthScore}`;
}

function loadWeight() {

    let canvas = document.getElementById("weight-chart");
    Plotly.newPlot(canvas,[{
        x: [1, 2, 3, 4, 5],
        y: [180, 175, 156, 150, 160] }]);
    
}

function loadCalories() {
    
    let canvas = document.getElementById("calorie-chart");
    Plotly.newPlot(canvas,[{
        x: [1, 2, 3, 4, 5],
        y: [180, 175, 156, 150, 160] }]);
}

function loadOverview(){
    
}
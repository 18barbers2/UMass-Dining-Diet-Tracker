'use strict';

// import {User} from './models/user.js';

let userData = {};

// window.addEventListener("load", () => {loadName(); loadGoals(); loadCalories(); loadWeight()});
window.addEventListener("load", async () => {await loadData(); loadName(); loadGoals(); loadCalories(); loadWeight();});


async function loadData() {
    //get the users email from the url
    const userEmail = window.location.href.split('/').pop();
    let userEmailJson = {"email": userEmail};
    const response = await fetch(`/user/schema`, {
        method: "POST", 
        body: JSON.stringify(userEmailJson),
        headers: {'Content-type': 'application/json'}
    }); 
    userData = await response.json();
}

function loadName() {
    document.getElementById("welcomeMsg").innerText = `Welcome ${userData["firstName"]}!`;
}

function loadGoals() {

    const goals = userData["nutritionGoals"];
    console.log(goals);
    let calories;
    let fat;
    let protein;
    let sodium;
    let sugar;
    let carbohydrates;
    let cholesterol;
    
    let calorieLimit;
    let fatLimit;
    let proteinLimit;
    let sodiumLimit;
    let sugarLimit;
    let carbohydratesLimit;
    let cholesterolLimit;
    
    const currentNutritionValues = userData["macroHistory"][0];
    console.log(currentNutritionValues);
    
    // if there is not macroHistory then assign default values for graphs and stuff
    const currentDate = "TODO: INPUT DATE";
    if(userData["macroHistory"].length === 0 /*|| userData["macroHistory"]["date"] !== currentDate*/) {
        calories = 0;
        fat = 0;
        protein = 0;
        sodium = 0;
        sugar = 0;
        carbohydrates = 0;
        cholesterol = 0;
    } else {
        calories = currentNutritionValues["caloriesTotal"];         
        fat = currentNutritionValues["fatTotal"];      
        protein = currentNutritionValues["proteinTotal"];           
        sodium = currentNutritionValues["sodiumTotal"];    
        sugar = currentNutritionValues["sugarTotal"];
        carbohydrates = currentNutritionValues["carbohydratesTotal"];
        cholesterol = currentNutritionValues["cholesterolTotal"];
    }

    calorieLimit = goals["calories"];
    fatLimit = goals["fat"];
    proteinLimit = goals["protein"];
    sodiumLimit = goals["sodium"];
    sugarLimit = goals["sugar"];
    carbohydratesLimit = goals["carbohydrates"];
    cholesterolLimit = goals["cholesterol"];

    console.log(calories, fat, protein,sodium,sugar,carbohydrates);
    //set progress bars
    let bar = document.getElementById("calorie-progress");
    let percentage = Math.floor(100 * (calories / calorieLimit));
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("carbs-progress");
    percentage = Math.floor(100 * (carbohydrates / carbohydratesLimit));
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

    // get users macroHistory data
    const dietHistory = userData["macroHistory"];
    // for each of the last values up to a week, get the dates and make them labels

    let labels = [];
    let dataPoints = [];
    let length = dietHistory.length > 7 ? 7 : dietHistory.length;

    for(let i = 0; i < length; i++) {
        let date = dietHistory[i]["date"];
        console.log(`THE DATE IS: ${date}`);
        labels.push(date);
        dataPoints.push(dietHistory[i]["weightToday"]);
    }

    // reverse both
    labels.reverse();
    dataPoints.reverse();

    const data = {
        labels: labels,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: dataPoints,
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    };
    const myChart = new Chart(document.getElementById('myWeightChart'), config);
    
}

function loadCalories() {
    

    // get users macroHistory data
    const dietHistory = userData["macroHistory"];
    // for each of the last values up to a week, get the dates and make them labels

    let labels = [];
    let dataPoints = [];
    let length = dietHistory.length > 7 ? 7 : dietHistory.length;

    for(let i = 0; i < length; i++) {
        let date = dietHistory[i]["date"];
        console.log(`THE DATE IS: ${date}`);
        labels.push(date);
        dataPoints.push(dietHistory[i]["caloriesTotal"]);
    }

    // reverse both
    labels.reverse();
    dataPoints.reverse();

    const data = {
        labels: labels,
        datasets: [{
          label: 'Calories',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: dataPoints,
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    };
    const myChart = new Chart(document.getElementById('myCalorieChart'), config);
}

function loadOverview(){
    
}
'use strict';

let userData = {};
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
    
    // if there is not macroHistory then assign default values for graphs and stuff
    if(userData["macroHistory"].length === 0) {
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

    let progressScore = 0;

    //set progress bars
    let bar = document.getElementById("calorie-progress");
    let percentage = Math.floor(100 * (calories / calorieLimit));
    progressScore += Math.min(percentage, 100);
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("carbs-progress");
    percentage = Math.floor(100 * (carbohydrates / carbohydratesLimit));
    progressScore += Math.min(percentage, 100);
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("protein-progress");
    percentage = Math.floor(100 * (protein/proteinLimit));
    progressScore += Math.min(percentage, 100);
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("fat-progress");
    percentage = Math.floor(100 * (fat / fatLimit));
    progressScore += Math.min(percentage, 100);
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("sodium-progress");
    percentage = Math.floor(100 * (sodium / sodiumLimit));
    progressScore += Math.min(percentage, 100);
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("sugar-progress");
    percentage = Math.floor(100 * (sugar / sugarLimit));
    progressScore += Math.min(percentage, 100);
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    bar = document.getElementById("cholesterol-progress");
    percentage = Math.floor(100 * (cholesterol / cholesterolLimit));
    progressScore += Math.min(percentage, 100);
    bar.style.setProperty("width",`${percentage}%`);
    bar.innerText = `${percentage}%`;

    let healthScore = Math.floor(progressScore / 7);
    document.getElementById("health-score").innerText = `Overall Progress Score: ${healthScore} / 100`;
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
        labels.push(date);
        dataPoints.push(dietHistory[i]["weightToday"]);
    }

    // reverse both
    labels.reverse();
    dataPoints.reverse();

    const data = {
        labels: labels,
        datasets: [{
          label: 'Weight',
          backgroundColor: '#AA00FF',
          borderColor: '#AA00FF',
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
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(201, 203, 207, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(201, 203, 207, 0.8)'
          ],
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
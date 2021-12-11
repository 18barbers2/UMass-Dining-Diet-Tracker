'use strict';
async function updateDailyGoals() {
    console.log("BUTTON CLICKED UPDATING GOALS");
    
    const dailyGoals = JSON.stringify(getDailyGoalValues());

    let endpoint = `/profile/update`;
    const response = await fetch(endpoint, {
        method: 'POST',
        body: dailyGoals,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        alert("Goals Updated!");
        window.location = response.url;
    }
    else {
        alert("ERROR SAVING DAILY GOALS");
    }

}

function getDailyGoalValues() {

    // note: could be changed to loop if html is changed
    const calories = document.getElementById("calorie-goal").value;
    const carbohydrates = document.getElementById("carbohydrates-goal").value;
    const fat = document.getElementById("fat-goal").value;
    const sodium = document.getElementById("sodium-goal").value;
    const cholesterol = document.getElementById("cholesterol-goal").value;
    const sugar = document.getElementById("sugar-goal").value;
    const protein = document.getElementById("protein-goal").value;
    const weight = document.getElementById("weight").value;

    const goals = {
        nutritionGoals : {
            calories: calories,
            protein: protein,
            carbohydrates: carbohydrates,
            cholesterol: cholesterol,
            fat: fat,
            sodium: sodium,
            sugar: sugar
        },
        weightToday: weight
    };
    
    return goals;
}
    
    const updateDailyValues = document.getElementById("update-nutrition");
    updateDailyValues.addEventListener("click", () => updateDailyGoals());

    document.getElementById("calorie-avg-button").addEventListener("click", ()=> {
        document.getElementById("calorie-goal").value = 2000;
    });
    document.getElementById("carbohydrates-avg-button").addEventListener("click", ()=> {
        document.getElementById("carbohydrates-goal").value = 300;
    });
    document.getElementById("sodium-avg-button").addEventListener("click", ()=> {
        document.getElementById("sodium-goal").value= 2000;
    });
    document.getElementById("cholesterol-avg-button").addEventListener("click", ()=> {
        document.getElementById("cholesterol-goal").value = 250;
    });
    document.getElementById("sugar-avg-button").addEventListener("click", ()=> {
        document.getElementById("sugar-goal").value = 24;
    });
    document.getElementById("protein-avg-button").addEventListener("click", ()=> {
        document.getElementById("protein-goal").value = 50;
    });
    document.getElementById("fat-avg-button").addEventListener("click", ()=> {
        document.getElementById("fat-goal").value = 50;
    });
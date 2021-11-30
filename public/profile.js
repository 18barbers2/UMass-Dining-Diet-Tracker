'use strict';
async function updateDailyGoals() {
    console.log("BUTTON CLICKED UPDATING GOALS");
    
    const dailyGoals = JSON.stringify(getDailyGoalValues());

    let endpoint = `/profile`;
    await fetch(endpoint, {
        method: 'POST',
        body: dailyGoals,
        headers: {
            'Content-Type': 'application/json'
        }
    });

}

function getDailyGoalValues() {
    console.log("BUNDLING UP DATA");

    // note: could be changed to loop if html is changed
    const calories = document.getElementById("calorie-goal").value;
    const carbohydrates = document.getElementById("carbs-goal").value;
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
        }
    };
    
    return goals;
}
    
    const updateDailyValues = document.getElementById("update-nutrition");
    updateDailyValues.addEventListener("click", () => updateDailyGoals());
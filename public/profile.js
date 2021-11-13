'use strict';


async function updateDailyGoals() {
    // let output = "";
    //  let apiLink = "http://localhost:8080/profile/update";
    // console.log("BUTTON CLICKED UPDATING GOALS");

    //TODO:SEND NUTRITIONAL TINGZ TO DATABASE
    getDailyGoalValues();

}


function getDailyGoalValues() {

    const calories = document.getElementById("calorie-goal").value;
    const carbs = document.getElementById("carbs-goal").value;
    const fat = document.getElementById("fat-goal").value;
    const sodium = document.getElementById("sodium-goal").value;
    const cholesterol = document.getElementById("cholesterol-goal").value;
    const sugar = document.getElementById("sugar-goal").value;
    const protein = document.getElementById("protein-goal").value;
    const weight = document.getElementById("weight").value;

    let nutritionJSON = {"weight": weight, "calorieLimit": calories, "carbLimit": carbs, "fatLimit": fat,"sodiumLimit": sodium, "cholesterolLimit": cholesterol, "sugarLimit": sugar, "proteinLimit": protein};
    
    const user = JSON.parse(storage.getItem("user"));

    for (let item of Object.keys(nutritionJSON)){

        user[item] = nutritionJSON[item];        

    }

    window.localStorage.setItem("user", JSON.stringify(user));
}

const updateDailyValues = document.getElementById("update-nutrition");
updateDailyValues.addEventListener("click", updateDailyGoals);

'use strict';


async function updateDailyGoals() {
    let output = "";
    let apiLink = "http://localhost:8080/profile/update";
    
    console.log("BUTTON CLICKED UPDATING GOALS");

    const dailyGoals = getDailyGoalValues();

    window.localStorage.setItem("daily_goals", dailyGoals);

    const response = await fetch(apiLink , {
        method: 'POST',
        body: dailyGoals,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });

    //check if the response was a success

    console.log(response.ok);
    // if (response.ok) {
    //     const userJSON = await response.json();
    //     output = userJSON;
    // } else {
    //     //report error if you cant reach the api
    //     output = "fail";
    // }
    // const name = output["name"];
    // const storage = window.sessionStorage;
    // //if the name is not already stored in the local session
    // if (storage.getItem("name") === null) {
    //     storage.setItem("name", name);
    // }
}


function getDailyGoalValues() {

    const calories = document.getElementById("calorie-goal").value;
    const carbs = document.getElementById("calorie-goal").value;
    const fat = document.getElementById("fat-goal").value;
    const sodium = document.getElementById("sodium-goal").value;
    const cholesterol = document.getElementById("cholesterol-goal").value;
    const sugar = document.getElementById("sugar-goal").value;
    const protein = document.getElementById("protein-goal").value;

    let nutritionJSON = {"calories": calories, "carbs": carbs, "fat": fat,"sodium": sodium, "cholesterol": cholesterol, "sugar": sugar, "protein": protein};
    return JSON.stringify(nutritionJSON);
}

const updateDailyValues = document.getElementById("update-nutrition");
updateDailyValues.addEventListener("click", updateDailyGoals);

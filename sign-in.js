'use strict';
const output = {
    "name": "Nicki", "calorieLimit": 2000, "fatLimit": 50, "sodiumLimit": 3400, "sugarLimit": 125,
    "proteinLimit": 50, "carbLimit": 300, "cholesterolLimit": 250, "calories": 700, "fats": 22, 
    "sodium": 2000, "sugar": 33, "protein": 48, "carbs": 158, "cholesterol": 220
};
const storage = window.localStorage;
storage.setItem("user", JSON.stringify(output));


// const loginButton = document.getElementById("login-button");
// loginButton.addEventListener('click', updateName);

// async function updateName() {
//     let output = "";
//     let apiLink = "http://localhost:8080/login/" + document.getElementById("username").value + "/";
//     const response = await fetch(apiLink);
//     //check if the response was a success
//     if (response.ok) {
//         const userJSON = await response.json();
//         output = userJSON;
//     } else {
//         //report error if you cant reach the api
//         output = "fail";
//     }
//     const storage = window.localStorage;
//     storage.setItem("user", output);
// }


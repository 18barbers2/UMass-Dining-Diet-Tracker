const addFood = document.getElementById("addFood");
const frankButton = document.getElementById("frank");
const worcesterButton = document.getElementById("worcester");
const berkshireButton = document.getElementById("berkshire");
const hampshireButton = document.getElementById("hampshire");
const breakfastButton = document.getElementById("breakfastBtn");
const lunchButton = document.getElementById("lunchBtn");
const dinnerButton = document.getElementById("dinnerBtn");
const grabButton = document.getElementById("grabBtn");
addFood.addEventListener('click', foodCheckout);
breakfastButton.addEventListener('click', foodTableUpdate);
lunchButton.addEventListener('click', foodTableUpdate);
dinnerButton.addEventListener('click', foodTableUpdate);
grabButton.addEventListener('click', foodTableUpdate);
frankButton.addEventListener('click', foodTableUpdate);
worcesterButton.addEventListener('click', foodTableUpdate);
berkshireButton.addEventListener('click', foodTableUpdate);
hampshireButton.addEventListener('click', foodTableUpdate);

// CurrentMenu: Object holds values for all dining halls and meal times. Hall Buttons should grab their respective hall values
// hallMenu: menu for the current dining hall. Should change when clicking a dining hall button, by moving info from currentMenu
let currentMenu = {};
let hallMenu = {};
let lastClickedHall = "";
let lastClickedMeal = "";

//On load: Get food object from DB, put into "currentMenu" object
window.onload = async function() {
  const apiLink = "/get-food/"
      let output = "";
      const response = await fetch(apiLink)
      if (response.ok) {
        try {
          const userJSON = await response.json();
          currentMenu = userJSON;
          frankButton.click();
          lunchButton.click(); //default shows breakfast for the dininghall so its not empty
        } catch {
          console.log("Error getting menu from database");
        }
          
      } else {
          console.log("fail");
          output = "fail";
      }  
}

/* 
Adds a label to the food table, which I just display text larger than food items
*/
function foodTableAddLabel(name) {
  
  const table = document.getElementById("foodTable");
  let row = table.insertRow(-1);
  let foodEntry = row.insertCell(-1);
  
  let foodFormat = document.createElement("h2");
  let foodText = document.createTextNode(name);
  foodFormat.appendChild(foodText); 
  foodEntry.appendChild(foodFormat);

}
//Onload: get food object from DB, parse, put into currentMenu
async function foodTableUpdate(event){
  foodTableClear();
  const displayText = document.getElementById("foodDisplayText");
  
  const buttonType = event.currentTarget.id;
  
  
  const mealButtons = ["breakfastBtn", "lunchBtn", "dinnerBtn", "grabBtn"];
  const diningHalls = ["frank", "worcester", "berkshire", "hampshire"];
  //Clicking a meal button. Should parse from global object that stores last clicked dining hall button.
  if(mealButtons.includes(buttonType)){
    //For each button: check if the menu exists in for the current dininghall
    if(buttonType === "breakfastBtn" && hallMenu.breakfast_menu){
      for(let i = 0; i < hallMenu.breakfast_menu.length; i++) {
        //if label, need to add to food table in different way
        const breakfastMenuItem = hallMenu.breakfast_menu[i].foodName;
        if(breakfastMenuItem === undefined) { //its a label
         foodTableAddLabel(hallMenu.breakfast_menu[i].label); //Add to table without checkbox, make bold/display
        } else { 
          foodTableAdd(breakfastMenuItem); //otherwise, add the food normally
        }
        lastClickedMeal = "Breakfast";
        
      }
    
    } else if(buttonType === "lunchBtn" && hallMenu.lunch_menu){
      for(let i = 0; i < hallMenu.lunch_menu.length; i++) {
        const lunchMenuItem = hallMenu.lunch_menu[i].foodName;
        if(lunchMenuItem === undefined) { //its a label
          foodTableAddLabel(hallMenu.lunch_menu[i].label); //Add to table without checkbox, make bold/display
        } else {
          foodTableAdd(lunchMenuItem); //otherwise, add the food normally
        }
      }
      lastClickedMeal = "Lunch";

    } else if(buttonType === "dinnerBtn" && hallMenu.dinner_menu){
      for(let i = 0; i < hallMenu.dinner_menu.length; i++) {
        const dinnerMenuItem = hallMenu.dinner_menu[i].foodName;
        if(dinnerMenuItem === undefined) { //its a label
          foodTableAddLabel(hallMenu.dinner_menu[i].label); //Add to table without checkbox, make bold/display
        } else {
          foodTableAdd(dinnerMenuItem); //otherwise, add the food normally
        }
      }
      lastClickedMeal = "Dinner";
    } else if(buttonType === "grabBtn" && hallMenu.grabngo){
      for(let i = 0; i < hallMenu.grabngo.length; i++) {
        const grabMenuItem = hallMenu.grabngo[i].foodName;
        if(grabMenuItem === undefined) { //its a label
          foodTableAddLabel(hallMenu.grabngo[i].label); //Add to table without checkbox, make bold/display
        } else {
          foodTableAdd(grabMenuItem); //otherwise, add the food normally
        }
      }
      lastClickedMeal = "Grab N'Go";
    } else { //Meal time not available
      const cont = document.getElementById("foodContainer");
      const foodFormat = document.createElement("h2");
      foodFormat.classList.add("notAvailable");
      foodFormat.classList.add("display-4");
      const foodText = document.createTextNode(`${event.currentTarget.textContent} is not currently available at ${lastClickedHall}.`);
      lastClickedMeal = event.currentTarget.textContent;
      foodFormat.appendChild(foodText);
      cont.appendChild(foodFormat);
    }

    //When clicking a dininghall button: update hallMenu (which meal buttons use), and display lunch(so table isn't empty)
  } else if(diningHalls.includes(buttonType)){
    //add check to see if dining hall exists, so we can display it doesn't
      if(buttonType === "frank"){
        hallMenu = currentMenu.Franklin;
        lunchButton.click();
        lastClickedHall = "Frank";
      } else if(buttonType === "worcester") {
          hallMenu = currentMenu.Worcester;
          lunchButton.click();
          lastClickedHall = "Worcester";
      } else if(buttonType === "berkshire") {
          hallMenu = currentMenu.Berkshire;
          lunchButton.click();
          lastClickedHall = "Berkshire";
      } else if(buttonType === "hampshire") {
          hallMenu = currentMenu.Hampshire;
          lunchButton.click();
          lastClickedHall = "Hampshire";
      } 
  } else { //Hallmenu is empty due to error
      const cont = document.getElementById("foodContainer");
      const foodFormat = document.createElement("h2");
      foodFormat.classList.add("notAvailable");
      foodFormat.classList.add("display-4");
      const foodText = document.createTextNode(`An error occured trying to access today's menu.`);
      foodFormat.appendChild(foodText);
      cont.appendChild(foodFormat);
      displayText.innerHTML = "No Menu Available."
  }
  displayText.innerHTML = `Current Menu: ${lastClickedHall} ${lastClickedMeal}`;
}

function foodTableAdd(name){
  const table = document.getElementById("foodTable");
  let row = table.insertRow(-1);
  let foodEntry = row.insertCell(-1);
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "box";
  checkbox.onclick = function () {
    toggleCheckbox(this);
  }
  let foodText = document.createTextNode(name);
  let label = document.createElement("label");
  label.style.margin = "0.5em";
  label.style.fontSize = "1.25em";
  label.appendChild(foodText);
  foodEntry.appendChild(checkbox);

  //box goes after input
  let inputAmount = document.createElement("input");
  inputAmount.style = "width: 3em";
  inputAmount.type = "number";
  inputAmount.min = "1";
  inputAmount.max = "10";
  inputAmount.value = 1;
  foodEntry.appendChild(label);
  foodEntry.appendChild(inputAmount);
}

/* Removes Currently displayed food in table */
function foodTableClear() {
  const table = document.getElementById("foodTable");
  const rows = table.rows;
  while(rows.length > 0) { // Delete all rows, which deletes all checkout food values
    table.deleteRow(-1);
  }
  
  let notAvailableText = document.getElementsByClassName("notAvailable");
  
  if(notAvailableText){
    
    while(notAvailableText[0]){
      notAvailableText[0].parentNode.removeChild(notAvailableText[0]);
    }
  }

}
function uncheckAllBoxes() {
  let boxes = document.getElementsByName("box");
  for(let i = 0; i < boxes.length; i++){
    boxes[i].checked = false;
  }
}
function toggleCheckbox(item) {
  /* if an item is checked and clicked on, add row and insert cell of item name */
  const labelText = item.nextElementSibling.textContent.replace(/[\n\r]+|[\s]{2,}/g, ''); //checkbox we're clicking's food name
  const table = document.getElementById("checkoutTable");
  if(item.checked === true) {
    const foodAmount = item.nextElementSibling.nextElementSibling.value;
    for(let i = 0; i < foodAmount; i++){ //Add food x times, where x is amount specified in input box
      let row = table.insertRow(-1); //Insert row at last position
      let foodCheckoutText = row.insertCell(0);
      foodCheckoutText.textContent = labelText;
      foodCheckoutText.classList.add("h5");
    }
    
  } else { //unchecking food: remove table with the text value of the food we uncheck by looping through checkout section and removing it
      const rows = table.rows;
      let totalRows = rows.length;
      for(let i = totalRows-1; i >= 0; i--){ 
        if(labelText === rows[i].cells[0].textContent) {
          table.deleteRow(i);
        }
      }
    }
}

async function foodCheckout() {
    let output = "";
    let selectedList = {};
    let totalNutrients = {"calories": 0, "protein": 0, "carbohydrates": 0, "cholesterol": 0, "fat": 0, "sugar": 0, "sodium": 0};
    /* Loop through checkout table. For each row/cell, add to selectedList.
    Then, uncheck all boxes. */
    const table = document.getElementById("checkoutTable");
    const rows = table.rows;
    for(let i = 0; i < rows.length; i++){
      let cells = rows[i].cells;
      for(let j = 0; j < cells.length; j++){
        const foodEntry = cells[j].textContent;
        if(selectedList[foodEntry]) {
          selectedList[foodEntry] += 1;   //if multiples exist, add to existing entry
        } else {
          selectedList[foodEntry] = 1;  //otherwise, create new entry
        }
      }
    }
    while(rows.length > 0) { // Delete all rows, which deletes all checkout food values
      table.deleteRow(-1);
    }
    
    uncheckAllBoxes(); //uncheck all boxes if food display

    // For each item in current checkout, search through dining hall food names. If a checkout
    // entry matches a food name, add that food's nutrients to an aggregate of all nutrients
    // for the current checkout
    for(let k1 in hallMenu){
      for(let k2 in hallMenu[k1]){
        let currFoodName = hallMenu[k1][k2].foodName;
        let labelCheck = hallMenu[k1][k2].label;
  
        
        if(selectedList[currFoodName]){
          let nutrients = hallMenu[k1][k2].nutritionFacts;
          for(let k3 in nutrients){
            totalNutrients[k3] += nutrients[k3];
          }
        } else if(selectedList[labelCheck]){
        } 
      }
    }

    const userEmail = window.location.href.split('/').pop();

    const checkoutObj = {"email": userEmail, "totalNutrients": totalNutrients};
    if(Object.keys(selectedList).length !== 0){ //If checkout is not empty
      let apiLink = "/checkout-add/"
      const response = await fetch(apiLink , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(checkoutObj)
        });
    }
}
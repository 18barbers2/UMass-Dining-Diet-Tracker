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

//On load: Get food object from DB, put into "currentMenu" object
window.onload = async function() {

  const apiLink = "http://localhost:8080/get-food/" 
      
      let output = "";

      const response = await fetch(apiLink)

      if (response.ok) {
          const userJSON = await response.json();
          currentMenu = userJSON; 
          frankButton.click();
          breakfastButton.click(); //default shows breakfast for the dininghall so its not empty
          
      } else {
          console.log("fail");
          output = "fail";
      }  
}



//Onload: get food object from DB, parse, put into currentMenu
async function foodTableUpdate(event){

  foodTableClear();
  const buttonType = event.currentTarget.id;
  const mealButtons = ["breakfastBtn", "lunchBtn", "dinnerBtn", "grabBtn"];
  const diningHalls = ["frank", "worcester", "berkshire", "hampshire"];

  //Clicking a meal button. Should parse from global object that stores last clicked dining hall button.
  if(mealButtons.includes(buttonType)){
    
    //For each button: check if the menu exists in for the current dininghall
    if(buttonType === "breakfastBtn" && hallMenu.breakfast_menu){ 
      for(let i = 0; i < hallMenu.breakfast_menu.length; i++) {
        foodTableAdd(hallMenu.breakfast_menu[i].foodName);
      }
      //console.log(hallMenu.breakfast_menu[0].foodName); //this gets first food name in hall's breakfast menu
      
    } else if(buttonType === "lunchBtn" && hallMenu.lunch_menu){
      for(let i = 0; i < hallMenu.lunch_menu.length; i++) {
        foodTableAdd(hallMenu.lunch_menu[i].foodName);
      }

    } else if(buttonType === "dinnerBtn" && hallMenu.dinner_menu){
      for(let i = 0; i < hallMenu.dinner_menu.length; i++) {
        foodTableAdd(hallMenu.dinner_menu[i].foodName);
      }
    } else if(buttonType === "grabBtn" && hallMenu.grabngo){
      for(let i = 0; i < hallMenu.grabngo.length; i++) {
        foodTableAdd(hallMenu.grabngo[i].foodName);
      }
    } //else: display "not available"
    
    //When clicking a dininghall button: update hallMenu (which meal buttons use), and display lunch(so table isn't empty)
  } else if(diningHalls.includes(buttonType)){
      if(buttonType === "frank"){
        //console.log(currentMenu.Franklin);
        hallMenu = currentMenu.Franklin;
        lunchButton.click();
        //console.log(hallMenu);
        //console.log(JSON.stringify(hallMenu));
      } else if(buttonType === "worcester") {
          hallMenu = currentMenu.Worcester;
          lunchButton.click();
      } else if(buttonType === "berkshire") {
          hallMenu = currentMenu.Berkshire;
          lunchButton.click();
      } else if(buttonType === "hampshire") {
          hallMenu = currentMenu.Hampshire;
          lunchButton.click();
      } 
      
      
  }
}

/*
1. For now, just add original items. Function should eventually take an argument to populate with correct data.
2. "name" is a string of the food name.
Possible: take array of strings (or json if we use other values rather than just name)
then for each name, do this

When clicking dining hall button: grab dining hall db collection
*/

function foodTableAdd(name){
  const table = document.getElementById("foodTable");
  let row = table.insertRow(-1);
  let foodEntry = row.insertCell(-1);

  let formCheck = document.createElement('div');
  formCheck.className = "form-check"; 

  let checkboxInput = document.createElement('input');
  checkboxInput.type = "checkbox";
  checkboxInput.className = "form-check-input";
  checkboxInput.id = "defaultCheck1";
  checkboxInput.onclick = function () {
    toggleCheckbox(this);
  }

  let foodLabel = document.createElement("label");
  foodLabel.className = "form-check-label";
  foodLabel.htmlFor = "defaultCheck1";
  let foodFormat = document.createElement("h5");

  let foodText = document.createTextNode(name);

  foodFormat.appendChild(foodText); //Add formatting (h4) to text
  checkboxInput.appendChild(foodLabel); // add label to checkbox 
  
  formCheck.appendChild(checkboxInput); //add checkbox to form
  formCheck.appendChild(foodFormat); // THEN add formatted text
  
  foodEntry.appendChild(formCheck);

}

/* Removes Currently displayed food in table */
function foodTableClear() {
  const table = document.getElementById("foodTable");
  const rows = table.rows;
  while(rows.length > 0) { // Delete all rows, which deletes all checkout food values
    table.deleteRow(-1);
  }
}

//TODO: Add numbers next to each item
function toggleCheckbox(item) {
  /* if an item is checked and clicked on, add row and insert cell of item name */

  const labelText = item.nextElementSibling.textContent.replace(/[\n\r]+|[\s]{2,}/g, ''); //checkbox we're clicking's food name
  const table = document.getElementById("checkoutTable");
  if(item.checked === true) {
    let row = table.insertRow(-1); //Insert row at last position
    let foodCheckoutText = row.insertCell(0);
    foodCheckoutText.textContent = labelText;
    foodCheckoutText.classList.add("h5");

  } else { //unchecking food: remove table with the text value of the food we uncheck by looping through and removing it
      const rows = table.rows;

      for(let i = 0; i < rows.length; i++){ // For every entry in checkout

        let cells = rows[i].cells; //Get cells for a row (should just be one, which is the entry)

        for(let j = 0; j < cells.length; j++){

          if(labelText === cells[j].textContent){ // If matching, remove
            table.deleteRow(i); //delete the row
          }
         
        }
      }
  }
}

/* CHECKOUT WITH DATABASE
1. Add the checkout items into object, selectedItems, which has form {"foodname":amount}
2. For each item in selectedItems, find where it is is currentMenu, and add each nutrient to totalNutrients

3??
*/

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
    
    let checkoutHeaders = document.getElementsByClassName('form-check-input');
    for(let i = 0; i < checkoutHeaders.length; i++) {
      checkoutHeaders[i].checked = false;
    }
    
    for(let k1 in hallMenu){

      for(let k2 in hallMenu[k1]){
        
        let currFoodName = hallMenu[k1][k2].foodName;
        
        if(selectedList[currFoodName]){
        
          let nutrients = hallMenu[k1][k2].nutritionFacts;
          for(let k3 in nutrients){
            
            totalNutrients[k3] += nutrients[k3];
          }
          
        }
      }
    }

    const checkoutObj = {"email":window.localStorage.getItem("userEmail"), "totalNutrients":totalNutrients};
    

    if(Object.keys(selectedList).length !== 0){ //If checkout is not empty
      let apiLink = "http://localhost:8080/checkout-add/" 
      
      const response = await fetch(apiLink , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(checkoutObj)
        });

      
      if (response.ok) {
          const userJSON = await response.json();
          output = userJSON; 
          console.log("success");
      } else {
          console.log("fail");
          output = "fail";
      }

      /* For each item in "output":
          1. if the item does not exist in localstorage, initialize to 0
          2. otherwise, add it to the existing count  
      */
      //should be obsolete when updating food thru database
    
    }
}




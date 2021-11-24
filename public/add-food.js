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

window.onload = function() {
  frankButton.click();
}

/* Rough draft of how to get data
1. Each dining hall button has endpoint
2. That endpoint will grab that dining hall's data, including food
3. Data put into a global object 
4. Upon clicking a meal time button, find time in global object, add all foods into table
5. ???
6. profit
*/
//FOR NOW: get used to mongoose/Plan around mongoose. note: all mongoose stuff should be thru server

/*Two types of buttons: 1. dining hall button 2. meal button
If pressing dining hall button, make db request for that dining hall's values, store in some value

function toggleCheckbox(item) {
  //if checked, add to checkout. 
  //loop through selected class. if text is empty, add to it. otherwise, checkout is full.
  //var checkBoxes = document.getElementsByClassName('form-check-label'); //get menu labels
  const checkoutHeaders = document.getElementsByClassName('selectedFood'); //get checkout h values

  const labelText = item.nextElementSibling.textContent.replace(/[\n\r]+|[\s]{2,}/g, ''); //checkbox we're clicking's food name

async function foodTableUpdate(event){
  foodTableClear();
  const buttonType = event.currentTarget.id;
  const mealButtons = ["breakfastBtn", "lunchBtn", "dinnerBtn", "grabBtn"];
  const diningHalls = ["frank", "worcester", "berkshire", "hampshire"];

  //Clicking a meal button. Should parse from global object that stores last clicked dining hall button.
  if(mealButtons.includes(buttonType)){
    
    if(buttonType === "breakfastBtn"){
      
      let exfood = checkoutHeaders[i].textContent.replace(/[\n\r]+|[\s]{2,}/g, ''); //for each food displayed in checkout
   
      if(exfood === "") { //if one is empty, add food there
        checkoutHeaders[i].textContent = labelText;
        break;
      }
    }
  } else { //unchecking the box: want to remove from the checkout by comparing string values
      
      for(let i = 0; i < checkoutHeaders.length; i++) { //for each text in header, check if same as unchecked box
        const exfood = checkoutHeaders[i].textContent.replace(/[\n\r]+|[\s]{2,}/g, ''); //each checkout food name
        //if current item name = one of the checkouts, remove checkout one
        if(labelText === exfood){
          //remove from checkout
          console.log(labelText + " is equal to " + exfood);
          checkoutHeaders[i].textContent = ""; //make empty
        }
      }
  } else {
    console.log("error");
  }
  //console.log("today's menu: " + JSON.stringify(currentMenu));
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

/*click button: 
1. take items in names of selected items
2. send names to endpoint
3. get a json of combined nutrient values
4. add nutrient values to local storage
*/

async function foodCheckout() {
    
    let output = "";
    let selectedList = {};

    /* Loop through checkout table. For each row/cell, add to selectedList.
    Then, uncheck all boxes. */
    

    const headers = document.getElementsByClassName('selectedFood');
    let headersNumber = headers.length;
    for(let i = 0; i < headersNumber; i++) {
      let entry = headers[i].textContent;  //get text of selected item
      
      entry = entry.replace(/[\n\r]+|[\s]{2,}/g, ''); //get rid of formatting stuff
      if(entry === "") { //ensure no empty entries allowed (e.g. checkout on empty checkout / 1 item)
        continue;
      }
      if(selectedList[entry]) {
        selectedList[entry] += 100;   //if multiples exist, add to existing entry
      } else {
        selectedList[entry] = 100;  //otherwise, create new entry
      }
    }

    /* Uncheck all the checked boxes upon checkout */
    let checkoutHeaders = document.getElementsByClassName('form-check-input');
    for(let i = 0; i < checkoutHeaders.length; i++) {
      checkoutHeaders[i].checked = false;
    }

    let apiLink = "http://localhost:8080/checkout-add/" 

    /* TODO: if selectedList is empty, don't send request. Otherwise, spamming checkout button increases values.
    This could also be handled by the server, but probably bad idea. */

    const response = await fetch(apiLink , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(selectedList)
      });

    // Ensure response was successful
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
    for(let key in output){
      let storedValue = storage.getItem(key);
      if(!storedValue){ //item doesn't exist yet, set to 0
          storage.setItem(key, 0);
          storedValue = 0;
      }
      const newValue = parseInt(storage.getItem(key)) +  parseInt(output[key]); //add new value to value in storage
      storage.setItem(key, newValue); //update storage

    }
}




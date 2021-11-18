const addFood = document.getElementById("addFood");

addFood.addEventListener('click', foodCheckout);

/*
values stored in sessionStorage in a simple key-value pair, where
the key is the nutrient/macronutrient, and the value is a number representing the amount consumed
*/

const storage = window.localStorage;




function toggleCheckbox(item) {
  /* if an item is checked and clicked on, add row and insert cell of item name */

  const labelText = item.nextElementSibling.textContent.replace(/[\n\r]+|[\s]{2,}/g, ''); //checkbox we're clicking's food name
  const table = document.getElementById("checkoutTable");
  if(item.checked === true) {
    let row = table.insertRow(-1); //Insert row at last position
    let foodCheckoutText = row.insertCell(0);
    foodCheckoutText.textContent = labelText;
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

/*click button: 
1. take items in names of selected items
2. send names to endpoint
3. get a json of combined nutrient values
4. add nutrient values to local storage
*/
async function foodCheckout() {
    
    let output = "";
    let selectedList = {};

    const selectedParent = document.getElementById("selecteditems"); //ul above selected list
    const children = selectedParent.children; //children is list of html in "selected" area

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
      headers[i].textContent = ""; //just set to empty so we can reinsert 
      //later, can leave html same but have them empty so site doesn't start with random vals
    }

    /* Uncheck all the checked boxes upon checkout */
    let checkoutHeaders = document.getElementsByClassName('form-check-input');
    for(let i = 0; i < checkoutHeaders.length; i++) {
      checkoutHeaders[i].checked = false;
    }

    let apiLink = "http://localhost:8080/checkout-add/" 

    const response = await fetch(apiLink , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(selectedList)
      });

    //check if the response was a success
    if (response.ok) {
        const userJSON = await response.json();
        output = userJSON; //what the endpoint responds with (should be JSON)
        console.log("success");
    } else {
        //report error if you cant reach the api
        console.log("fail");
        output = "fail";
    }
    //output now holds the response, a JSON object that contains nutrient information about the foods added

    /*for each item in "output":
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


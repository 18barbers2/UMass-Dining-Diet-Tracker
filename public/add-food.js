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

/* On Checkout button click:
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
    

    const table = document.getElementById("checkoutTable");
    const rows = table.rows;
    for(let i = 0; i < rows.length; i++){ 

      let cells = rows[i].cells;

      for(let j = 0; j < cells.length; j++){
        const foodEntry = cells[j].textContent;
        if(selectedList[foodEntry]) {
          selectedList[foodEntry] += 100;   //if multiples exist, add to existing entry
        } else {
          selectedList[foodEntry] = 100;  //otherwise, create new entry
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




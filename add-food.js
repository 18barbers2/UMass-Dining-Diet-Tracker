const addFood = document.getElementById("addFood");

addFood.addEventListener('click', foodCheckout);

/*
values stored in sessionStorage in a simple key-value pair, where
the key is the nutrient/macronutrient, and the value is a number representing the amount consumed
*/

const storage = window.sessionStorage;

function toggleCheckbox(item) {
  //if checked, add to checkout. 
  //TODO: Remove from checkout????
  //loop through selected class. if text is empty, add to it. otherwise, checkout is full.
 
  //var checkBoxes = document.getElementsByClassName('form-check-label'); //get menu labels
  var checkoutHeaders = document.getElementsByClassName('selectedFood'); //get checkout h values

  var labelText = item.nextElementSibling.textContent.replace(/[\n\r]+|[\s]{2,}/g, ''); //checkbox we're clicking's food name

  if(item.checked === true) {

    for(let i = 0; i < checkoutHeaders.length; i++) { //for each checkout, check if empty
      
      var exfood = checkoutHeaders[i].textContent.replace(/[\n\r]+|[\s]{2,}/g, ''); //for each food displayed in checkout
   
      if(exfood === "") { //if one is empty, add food there
        checkoutHeaders[i].textContent = labelText;
        //make green when checked???
        
        break;
      } else { //no room
        //console.log("no room: " + exfood + " is already there");
      }
    }
  } else { //unchecking the box: want to remove from the checkout by comparing string values
      
      for(let i = 0; i < checkoutHeaders.length; i++) { //for each text in header, check if same as unchecked box
        var exfood = checkoutHeaders[i].textContent.replace(/[\n\r]+|[\s]{2,}/g, ''); //each checkout food name
        //if current item name = one of the checkouts, remove checkout one
        if(labelText === exfood){
          //remove from checkout
          console.log(labelText + " is equal to " + exfood);
          checkoutHeaders[i].textContent = ""; //make empty
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

    var headers = document.getElementsByClassName('selectedFood');
    let headersNumber = headers.length;
    for(let i = 0; i < headersNumber; i++) {
      var entry = headers[i].textContent;  //get text of selected item
      
      entry = entry.replace(/[\n\r]+|[\s]{2,}/g, ''); //get rid of formatting stuff
      if(entry === "") { //ensure no empty entries allowed (e.g. checkout on empty checkout / 1 item)
        //console.log("Empty entry");
        continue;
      }
      if(selectedList[entry]) {
        //console.log("existing entry: " + entry);
        selectedList[entry] += 100;   //if multiples exist, add to existing entry
      } else {
       // console.log("new entry: " + entry);
        selectedList[entry] = 100;  //otherwise, create new entry
      }
      headers[i].textContent = ""; //just set to empty so we can reinsert 
      //later, can leave html same but have them empty so site doesn't start with random vals
    }
    /*
    while(headers.length !== 0){
      if(headers.length > 0) {
        //TODO: either remove cols/rows, or leave them and add an h4 to them from menu (i.e. have a set number of added foods)
        //headers[0].remove(); //remove h4 (bad, cannot easily add back b/c missing class)
      }
    }
      */
    //TODO: uncheck all boxes by looping thru all checkbox items, setting checked = false 
    var checkoutHeaders = document.getElementsByClassName('form-check-input');
    for(let i = 0; i < checkoutHeaders.length; i++) {
      checkoutHeaders[i].checked = false;
    }


    let apiLink = "http://localhost:8080/checkout-food/" // + encodeURIcomponent(JSON.stringify(selectedList)) + "/";

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
    //console.log(JSON.stringify(output));

    /*for each item in "output":
        1. if the item does not exist in localstorage, initialize to 0
        2. otherwise, add it to the existing count  
    */

    for(var key in output){
      let storedValue = storage.getItem(key);
      if(!storedValue){ //item doesn't exist yet, set to 0
          storage.setItem(key, 0);
          storedValue = 0;
      }
      var newValue = parseInt(storage.getItem(key)) +  parseInt(output[key]); //add new value to value in storage
      storage.setItem(key, newValue); //update storage
      //console.log("storage value of " + key + ": " + storedValue);
      //console.log("newVal: " + newValue);
    }
    //console.log("New storage: " + JSON.stringify(storage));
    
    
}


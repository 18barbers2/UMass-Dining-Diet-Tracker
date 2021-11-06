const addFood = document.getElementById("addFood");

addFood.addEventListener('click', foodCheckout);


const storage = window.sessionStorage;

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

    
    
    

//children is a list

    var headers = document.getElementsByClassName('selectedFood');

    for(let i = 0; i < headers.length; i++) {
      var entry = headers[i].textContent;  //get text of selected item
      entry = entry.replace(/[\n\r]+|[\s]{2,}/g, ''); //get rid of formatting stuff
      
      if(selectedList[entry]) {
        selectedList[entry] += 100;   //if multiples exist, add to existing entry
      } else {
        selectedList[entry] = 100;  //otherwise, create new entry
      }
      
    }

   
      
    //console.log("list of selected items: " + JSON.stringify(selectedList)); //print items

   
    //console.log(Object.keys(selectedList));
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
    console.log("New storage: " + JSON.stringify(storage));
    
    
}
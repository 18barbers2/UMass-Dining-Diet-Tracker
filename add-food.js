const addFood = document.getElementById("addFood");

addFood.addEventListener('click', foodCheckout);


const storage = window.localStorage;


function toggleCheckbox(item) {
    if(item.checked) {

        //add checked item to selected items
        selectedItemsParent = document.getElementById("selecteditems");
        let newSelected = document.createElement('li');
        newSelected.setAttribute('class', 'list-group-item');
        newSelected.classList.add('h5');
        newSelected.innerHTML = "hi";
        selectedItemsParent.appendChild(newSelected);

        //change color to green
        item.parentNode.classList.add('list-group-item-success');

    } else {
        //remove from selected items
        //problem: html is not accessible because it is after the button (innerhtml includes the checkbox)
        selectedItemsParent = document.getElementById("selecteditems");
        let children = selectedItemsParent.childNodes;

        for(let i = 0; i < children.length; i++){
            console.log("child: " + children[i].innerHTML + " item: " + item.parentNode.childNodes);
            if(children[i].innerHTML === item.parentNode.innerHTML) {
                console.log("child: " + children[i].innerHTML + " item: " + item.parentNode.innerHTML);
            }
        }

        item.parentNode.classList.remove('list-group-item-success');
        console.log("its unchecked");
    }
    
    //console.log(item.type);
    
}


/*click button: 
1. take items in names of selected items
2. send names to endpoint
3. get a json of combined nutrient values
4. add nutrient values to local storage
*/

async function foodCheckout() {
    console.log("foodcheckout Called");
    let output = "";
    let selectedList = {};

    const selectedParent = document.getElementById("selecteditems"); //ul above selected list
    const children = selectedParent.children; //children is list of html in "selected" area
    for (var i = 0; i < children.length; i++) { //for each child, add to object: {"food name" : 100}
        var tableChild = children[i];  //
        console.log("selected item " + i + ": "+ tableChild.innerHTML);
        selectedList[tableChild.innerHTML] = 100;
        children[i].innerHTML = "";
      }
    while(selectedParent.hasChildNodes()){
        selectedParent.removeChild(selectedParent.lastChild)
    }
    console.log("list of selected items: " + JSON.stringify(selectedList)); //print items

   

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
    console.log(JSON.stringify(output));

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
        console.log("storage value of " + key + ": " + storedValue);
        console.log("newVal: " + newValue);

    }
}
    

  

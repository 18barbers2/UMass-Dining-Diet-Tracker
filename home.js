/*const storage = window.localStorage;
const named = storage.getItem('Bob');
for (var i = 0; i < storage.length; i++){
    // do something with localStorage.getItem(localStorage.key(i));
    console.log(storage.key(i) + ": " + storage[storage.key(i)]);
}
console.log("named = " + named);
if(named) {
    
    console.log("displayname: " + named);
    let welcome = document.getElementById('welcomeMsg');
    welcome.innerHTML = "Welcome, " + named + "!";
}
*/
const storage = window.localStorage;
for (var i = 0; i < storage.length; i++){ 
    let key = storage.key(i);
    console.log("Key: " + key + " value: " + storage.getItem(key));
}
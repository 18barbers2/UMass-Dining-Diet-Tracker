'use strict';
//const cors = require("cors")

const express = require('express');
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.static(__dirname));
//app.use(cors());

app.get('/login/:email', (req, res) => {
   // res.setHeader("Access-Control-Allow-Origin", "*");
    const username = req.params['email'];
    console.log(username);
    const name = "Bob";
    const json = {"name": name, "username": username};
    res.json(json);
});

//'{ "value" : "12" }'

//retrun json object with food values. will be passed food names
app.get('/checkout-food', (req, res) => {
    
    //console.log(JSON.stringify(req.body));
    //const json = {"calories": 500, "carbohydrates": 30, "fat": 25, "sodium": 200, "cholesterol": 40, "sugar": 35, "protein": 70};
   // res.json(json)
    res.sendFile(__dirname + '/add-food.html');
});


// register account
app.get('/user/register', (req,res) => {
    console.log(`body = ${JSON.stringify(req.body)}\n`);
    res.send('BODY');
});

app.get('/', (req,res) => {
    res.send("Register Account");
});


// update Profile Daily Values

app.get("/profile", (req,res) => {
    console.log("serving profile");
    res.sendFile(__dirname + '/profile.html');
});

// app.post('/profile/update',(req,res) => {
//     console.log(req.body);
//     res.sendFile(__dirname + '/home.html');
// });

app.get('/home',(req,res) => {
    console.log("serving home");
    res.sendFile(__dirname + '/home.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
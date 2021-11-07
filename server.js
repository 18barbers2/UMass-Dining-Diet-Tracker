'use strict';
//const cors = require("cors")

const express = require('express');
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/sign-in.html");
});

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



app.post('/checkout-add', (req, res) => {

    //res.setHeader("Access-Control-Allow-Origin", "*");
    //TODO: check empty sent value
    console.log(JSON.stringify(req.body));
    const json = {"calories": 500, "carbohydrates": 30, "fat": 25, "sodium": 200, "cholesterol": 40, "sugar": 35, "protein": 70};
    //res.json(json)
    res.json(json)
    //res.sendFile(__dirname + '/add-food.html');
});


// register account
app.get('/user/register', (req,res) => {
    console.log(`body = ${JSON.stringify(req.body)}\n`);
    res.send('BODY');
});

app.get('/login/:email', [loginErrorHandler, loginHandler]);
app.get('/home', (req, res) => {
    res.sendFile(__dirname + "/home.html");
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
//TODO: signin endpoint
app.get('/sign-in',(req,res) => {
    console.log("serving sign-in");
    res.sendFile(__dirname + '/sign-in.html');
});

app.get('/home',(req,res) => {
    console.log("serving home");
    res.sendFile(__dirname + '/home.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function loginErrorHandler(request, response, next) {
    const value = userFound();
    if (!value) {
        response.write(JSON.stringify({result: 'error'}));
        response.end(); //finish routing
    } else {
        next();
    }
}

function loginHandler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const username = req.params['email'];
    const json = {
        "name": "Bob", "calorieLimit": 2000, "fatLimit": 50, "sodiumLimit": 3400, "sugarLimit": 125,
        "proteinLimit": 50, "carbLimit": 300, "cholesterolLimit": 250, "calories": 700, "fats": 22, 
        "sodium": 2000, "sugar": 33, "protein": 48, "carbs": 158, "cholesterol": 220
    };
    res.json(json);
}

const userFound = () => true; 
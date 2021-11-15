'use strict';

import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/", express.static("public"));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/public/sign-in.html");
});

//retrun json object with food values. will be passed food names
app.get('/checkout-food', (req, res) => {
    res.sendFile(__dirname + '/public/add-food.html');
});


app.post('/checkout-add', (req, res) => {
    console.log(JSON.stringify(req.body));
    const json = {"calories": 500, "carbohydrates": 30, "fat": 25, "sodium": 200, "cholesterol": 40, "sugar": 35, "protein": 70};
    res.json(json);
});

app.get('/login/:email', [loginErrorHandler, loginHandler]);
app.get('/home', (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});


// update Profile Daily Values
app.get("/profile", (req,res) => {
    console.log("serving profile");
    res.sendFile(__dirname + '/public/profile.html');
});

app.get('/sign-in',(req,res) => {
    console.log("serving sign-in");
    res.sendFile(__dirname + '/public/sign-in.html');
});

app.get('/create-account',(req,res) => {
    console.log("serving create-account");
    res.sendFile(__dirname + '/public/create-account.html');
});

app.get('/forgot-password',(req,res) => {
    console.log("serving forgot-password");
    res.sendFile(__dirname + '/public/forgot-password.html');
});

app.post('/create/account', (req, res) => {
    const acctData = JSON.parse(req.body);
    console.log(`account data recieved: ${JSON.stringify(acctData)}`);
    updateDataBase(acctData);
    const updateDataBase = (data) => true;
    res.end();
});

app.post('/delete/password', (req, res) => {
    const email = JSON.parse(req.body);
    console.log(`account data recieved: ${JSON.stringify(acctData)}`);
    deleteEmail(email);
    const deleteEmail = (data) => true;
    res.end();
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
       "proteinLimit": 50, "carbLimit": 300, "cholesterolLimit": 250, "calories": 700, "fats": 22, 
      "name": "Bob", "calorieLimit": 2000, "fatLimit": 50, "sodiumLimit": 3400, "sugarLimit": 125,
           "sodium": 2000, "sugar": 33, "protein": 48, "carbs": 158, "cholesterol": 220, "weight": 140
    };
    res.json(json);
}

const userFound = () => true; 
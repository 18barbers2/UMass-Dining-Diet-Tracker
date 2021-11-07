'use strict';

const express = require('express');
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/sign-in.html");
});

app.get('/login/:email', [loginErrorHandler, loginHandler]);
app.get('/home', (req, res) => {
    res.sendFile(__dirname + "/home.html");
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
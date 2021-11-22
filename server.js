'use strict';

import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import mongoose from 'mongoose';
import { User } from './models/user.js';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/", express.static("public"));

//LEAVE ROOM FOR DATABASE STUFF


const pass = process.env.PASSWORD;
const dbname = 'umass_diet_tracker_database';
const url = `mongodb+srv://umassdiningdiettracker:${pass}@umassdiningcluster.dxpep.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const connectionParams={useNewUrlParser: true, useUnifiedTopology: true }

try {
    mongoose.connect(url, connectionParams);
    mongoose.connection.once('open',() => {
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    });
}
catch (error) {
    console.log("ISSUE WITH CONNECTING TO DATABASE");
}


app.get('/', (req,res) => {
    //res.sendFile(__dirname + "/public/sign-in.html");
    res.redirect("/sign-in");
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
app.get("/profile", (req, res) => {
    console.log("serving profile");
    res.sendFile(__dirname + '/public/profile.html');
});
app.post("/profile",(req, res) => {
    console.log("POST REQUEST RECEIVED");

    let data = req.body;
    console.log(data);

    //LOGIC FOR MONGOOSE STFF
    // const user = new User(data);
    // user.save();

    User.updateOne({username: "goofyrocks101"}, {$set: data}, (error, result) => {
        if(error){
            console.log("ERROR SENDING TO DATABASE");
        }
        else {
            console.log("DATA SENT TO DATABASE");
            console.log(result);
        }
    });
});

app.get('/sign-in',(req, res) => {
    console.log("serving sign-in");
    res.sendFile(__dirname + '/public/sign-in.html');
});

app.post('/sign-in',(req, res) => {
    console.log("posting to sign-in");
    res.sendStatus(200);

    //use mongoose to see if user exists with password
    console.log("finding from database");

    const result = User.find({email: req.body.email}, function (error, docs) {
        if(error) {
            console.log("ERROR FETCHING USER DATA");
        }
        else {
            return docs[0];
        }
    });

    console.log(result);

    // if(password === req.body.password) {
    //     console.log("THE PASSWORD IS CORRECT");
    // }


    //res.sendFile(__dirname + '/public/sign-in.html');


});

// CREATE ACCOUNT
app.get('/create-account',(req, res) => {
    console.log("serving create-account");
    res.sendFile(__dirname + '/public/create-account.html');

    // 
});

app.post('/create-account', (req, res) => {
    console.log("redirecting");
    console.log(req);
    res.sendFile(__dirname + '/public/sign-in.html')
});

// app.post('/create/account', (req, res) => {
//     const acctData = JSON.parse(req.body);
//     console.log(`account data recieved: ${JSON.stringify(acctData)}`);
//     updateDataBase(acctData);
//     const updateDataBase = (data) => true;
//     res.end();
// });

app.get('/forgot-password',(req,res) => {
    console.log("serving forgot-password");
    res.sendFile(__dirname + '/public/forgot-password.html');
});


app.post('/delete/password', (req, res) => {
    const email = JSON.parse(req.body);
    console.log(`account data recieved: ${JSON.stringify(acctData)}`);
    deleteEmail(email);
    const deleteEmail = (data) => true;
    res.end();
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
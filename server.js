'use strict';

import dotenv from 'dotenv';
dotenv.config();
import expressSession from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import minicrypt from './miniCrypt.js';
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { User } from './models/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8080;
const app = express();
const Strategy = LocalStrategy.Strategy;
const mc = new minicrypt();

const session = {
    secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave : false,
    saveUninitialized: false
};

const strategy = new Strategy(
    async (email, password, done) => {
        console.log("STRATEGY STARTING");
	if (!(await findUser(email))) {
	    // no such user
	    await new Promise((r) => setTimeout(r, 2000)); // two second delay
	    return done(null, false, { 'message' : 'Wrong username' });
	}
	if (!(await validatePassword(email, password))) {
	    // invalid password
	    // should disable logins after N messages
	    // delay return to rate-limit brute-force attacks
	    await new Promise((r) => setTimeout(r, 2000)); // two second delay
	    return done(null, false, { 'message' : 'Wrong password' });
	}
	// success!
	// should create a user object here, associated with a unique identifier
	return done(null, email);
});

app.use(express.json());
app.use("/", express.static("public"));
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());


// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // If we are authenticated, run the next route.
        next();
    } else {
        // Otherwise, redirect to the login page.
        res.redirect('/sign-in');
    }
}
//LEAVE ROOM FOR DATABASE STUFF

const pass = process.env.PASSWORD || 'cWDxP9BfaqjgzD4';
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

async function findUser(email) {
    console.log("FINDING THE USER")
    const q = User.find({email: email});
    const result = await q.exec();

    if(result[0] === undefined){
        console.log("USER NOT FOUND")
        return false;
    }
    console.log("USER FOUND");
    return true;
}

async function validatePassword(email, pwd) {
    
    if (!(await findUser(email))) {
	    return false;
    }

    const q = User.find({email:email});
    const queryResult = await q.exec();
    const [salt, hash] = queryResult[0].password;

    const res = mc.check(pwd, salt, hash);

    return res;
}

async function addUser(fname, lname, email, username, pwd) {
    if (await findUser(email)) {
	    return false;
    }

    const [salt, hash] = mc.hash(pwd);

    const newUserData = {
        username: username,
        firstName: fname,
        lastName: lname,
        email: email,
        password: [salt, hash],
        macroHistory: [],
        nutritionGoals : {
            calories: 2000,
            protein: 50,
            carbohydrates: 300,
            cholesterol: 250,
            fat: 50,
            sodium: 3400,
            sugar: 125
        }
    }

    const newUser = new User(newUserData);
    newUser.save();
    return true;
}

app.get('/', /*checkLoggedIn, */ (req, res) => {
    console.log("REIDRECTING")
    res.redirect("/sign-in");
});

app.get('/sign-in',(req, res) => {
    console.log("serving sign-in");
    res.sendFile(__dirname + '/public/sign-in.html');
});


// app.post('/sign-in', 
//     passport.authenticate('local', {     // use username/password authentication
//         'successRedirect' : '/home',   // when we login, go to /home
//         'failureRedirect' : '/sign-in', // otherwise, back to login
// }), function (req, res) {
    //     console.log("SUCECSS OR NOT SUCCESS");
    // });
    
app.post('/sign-in', async (req, res) =>  {
        console.log("posting to sign-in");
        const email = req.body.email;
        const password = req.body.password;
        console.log(req.body);
        // use mongoose to see if user exists with password

        console.log("finding from database");
        if(await validatePassword(email, password)){
            console.log("LOGIN SUCCESSFUL: ");
            res.send({email: email});
            // res.redirect('/profile');
        } else {
            res.sendStatus(500);
            //res.redirect('/sign-in');
        }
    });

// CREATE ACCOUNT
app.get('/create-account',(req, res) => {
    console.log("serving create-account");
    res.sendFile(__dirname + '/public/create-account.html');
});

app.post('/create-account', async (req, res) => {
    console.log("POST TO CREATE ACCOUNT");
    
    const lname = req.body.lname;
    const fname = req.body.fname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if(await addUser(fname, lname, email, username, password)) {
        console.log("ADDED NEW USER:");
        res.redirect('/sign-in');
    }
    else {
        res.redirect('/create-account');
    }
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});


//retrun json object with food values. will be passed food names
app.get('/checkout-food', (req, res) => {
    res.sendFile(__dirname + '/public/add-food.html');
});

// Recieves simple object of form {dinginHall: "name"}. Should be used to grab correct food from DB based on name
app.post('/get-food', (req, res) => {
    //console.log("get-food: " + JSON.stringify(req.body));
    const hall = req.body.diningHall;
    let menu = {};
    //each block should grab different info. or, we grab info above and parse in the block
    if(hall === "frank") {
        console.log("get-food: frank");
        menu = {breakfast: ["pancakes", "eggs"], lunch: ["sandwich", "coleslaw"], dinner: ["steak", "ramen"], grab: ["wings"]} //parsing depends on how item is retrieved
    } else if(hall === "worcester"){
        console.log("get-food: worcester");
        menu = {breakfast: ["hashbrowns", "fried egg"], lunch: ["salad", "bahn mi"], dinner: ["salmon", "buns"], grab: ["soda"]}
    } else if(hall === "berkshire") {
        console.log("get-food: berk");
        menu = {breakfast: ["breakfast burrito", "bagel"], lunch: ["mac n cheese", "cobb salad"], dinner: ["stir fry", "mushrooms"], grab: ["wrap"]}
    } else if(hall === "hampshire"){
        
        menu = {breakfast: ["waffles", "croissant"], lunch: ["mcdonalds", "coffee"], dinner: ["shrimp", "pasta"], grab: ["chicken and rice"]}
        console.log("get-food: hamp");
    }
    res.json(menu); //return data for that dining hall, to be stored in global
});

app.post('/checkout-add', (req, res) => {
    console.log(JSON.stringify(req.body));
    const json = {"calories": 500, "carbohydrates": 30, "fat": 25, "sodium": 200, "cholesterol": 40, "sugar": 35, "protein": 70};
    res.json(json);
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

    User.updateOne({email: "sambarber101@gmail.com"}, {$set: data}, (error, result) => {
        if(error){
            console.log("ERROR SENDING TO DATABASE");
        }
        else {
            console.log("DATA SENT TO DATABASE");
            console.log(result);
        }
    });
});

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

app.post('/user/schema', async (req, res) => {
    console.log("USER SCHEMA");
    console.log(req.body);
    const request  = req.body;
    const q = User.find({email: request["email"]});
    const response = await q.exec();
    const data = response[0];
    res.send(data);
    
});

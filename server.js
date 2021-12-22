'use strict';

import dotenv from 'dotenv';
import expressSession from 'express-session';
import passport from 'passport';
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { User, Food } from './models/user.js';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8080;
const app = express();

const session = {
    secret : process.env.SECRET, // set this encryption key in Heroku config (never in GitHub)!
    resave : false,
    saveUninitialized: false
};

const mailPass = process.env.EMAILPASS;
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'umassmacrotracker@gmail.com',
        pass: mailPass,
    },
    secure: true,
});

app.use(express.json());
app.use("/", express.static("public"));
app.use(express.urlencoded({'extended' : true})); // allow URLencoded data
app.use(expressSession(session));
passport.use(User.createStrategy());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('html'));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

const pass = process.env.PASSWORD;
const dbname = 'umass_diet_tracker_database';
const url = `mongodb+srv://umassdiningdiettracker:${pass}@umassdiningcluster.dxpep.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const connectionParams={useNewUrlParser: true, useUnifiedTopology: true }

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // If we are authenticated, run the next route.
        next();
    } else {
        // Otherwise, redirect to the login page.
        res.redirect('/sign-in');
    }
}

// server runs after connection to database
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

// finds user
async function findUser(email) {
    const q = User.find({email: email});
    const result = await q.exec();

    if(result[0] === undefined){
        console.log("USER NOT FOUND")
        return false;
    }
    return true;
}

app.get('/', (req, res) => {
    res.redirect("/sign-in");
});

app.get('/sign-in',(req, res) => {
    res.sendFile(__dirname + '/public/sign-in.html');
});

app.post('/sign-in', passport.authenticate('local', {
    'successRedirect' : '/home', 
    'failureRedirect' : '/sign-in',
}), (err, user) => {
    if(err) {
        res.json({success: false, message: err});
    }
    if(!user) {
        res.json({success:false, message: 'username or password incorrect'});
    }
});

// CREATE ACCOUNT
app.get('/create-account', (req, res) => {
    res.sendFile(__dirname + '/public/create-account.html');
});

app.post('/create-account', (req, res) => {    
    const lname = req.body.lname;
    const fname = req.body.fname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    User.register(new User({username: username, email: email, lastName:lname, firstName: fname}), password, function(err, user) {
        if(err) {
            console.log("error while creating account!", err);
            res.status(500).send(err);
        }else {
            console.log("user registered!");
            res.redirect('/');
        }
    });

});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.get('/home', checkLoggedIn, (req, res) => {
    res.redirect('/home/' + req.user["email"]);
});

app.get('/home/:userID/', checkLoggedIn, async (req, res) => {

    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    if (req.params.userID === req.user["email"]) {
        const q = User.find({email: req.user["email"]});
        const user = await q.exec();
        const newDay = {date:date, caloriesTotal:0, proteinTotal:0, carbohydratesTotal:0, cholesterolTotal:0, fatTotal:0, sodiumTotal:0, sugarTotal:0, weightToday:0};

        if(user[0]["macroHistory"][0]["date"] !== date){
            await User.findOneAndUpdate({email: req.user["email"]}, {$push: {macroHistory: {$each: [newDay], $position: 0}}});
        }
        res.sendFile(__dirname + "/public/home.html");
    } else {
        res.redirect('/sign-in');
    }
});


app.get('/checkout-food', checkLoggedIn, (req, res) => {
    res.redirect('/checkout-food/' + req.user["email"]);
});

//retrun json object with food values. will be passed food names
app.get('/checkout-food/:userID/', checkLoggedIn, (req, res) => {
    if (req.params.userID === req.user["email"]) {
        res.sendFile(__dirname + '/public/add-food.html');
    } else {
        res.redirect('/checkout-food');
    }
});

// Recieves simple object of form {dinginHall: "name"}. Should be used to grab correct food from DB based on name
app.get('/get-food',checkLoggedIn,  (req, res) => {
    
    
    let menu = Food.findOne(function (error, docs) {
        if(error) {
            console.log("ERROR FETCHING USER DATA");
        }
        else {
            res.send(docs);
        }
    });
});


app.post('/checkout-add', async (req, res) => {
    const checkoutObj = req.body;
    const totalNutrients = checkoutObj.totalNutrients;
    const query = User.find({email: checkoutObj.email});
    const result = await query.exec();
    const user = result[0];
    const macroHistory =  user["macroHistory"];

    macroHistory[0]["caloriesTotal"] += totalNutrients["calories"];
    macroHistory[0]["proteinTotal"] += totalNutrients["protein"];
    macroHistory[0]["carbohydratesTotal"] += totalNutrients["carbohydrates"];
    macroHistory[0]["cholesterolTotal"] += totalNutrients["cholesterol"];
    macroHistory[0]["fatTotal"] += totalNutrients["fat"];
    macroHistory[0]["sugarTotal"] += totalNutrients["sugar"];
    macroHistory[0]["sodiumTotal"] += totalNutrients["sodium"];

    await User.updateOne({email: checkoutObj.email}, {$set: {
        macroHistory: macroHistory
    }});
    
});

// update Profile Daily Values
app.get("/profile", checkLoggedIn, (req, res) => {
    res.redirect('/profile/' + req.user["email"]);
});

// update Profile Daily Values
app.get("/profile/:userID/", checkLoggedIn, (req, res) => {
    if (req.params.userID === req.user["email"]) {
        res.sendFile(__dirname + '/public/profile.html');
    } else {
        res.redirect('/profile');
    }
});

app.post("/profile/update", checkLoggedIn, async (req, res) => {
    let goals = req.body["nutritionGoals"];
    let weight = parseInt(req.body["weightToday"]);

    User.findOneAndUpdate({email: req.user["email"]}, {$set: {nutritionGoals: goals}}, (error, result) => {
        if(error){
            console.log("ERROR SENDING TO DATABASE");
            res.status(500);
        }
        else {
            console.log(`${req.user["email"]}'s GOALS UPDATED`);
            res.status(200).redirect('/home');
        }
    });

    const query = User.find({email: req.user["email"]});
    const result = await query.exec();
    const user = result[0];

    const macroHistory =  user["macroHistory"];
    macroHistory[0]["weightToday"] = weight;

    await User.updateOne({email: req.user["email"]}, {$set: {
        macroHistory: macroHistory
    }});

});

app.get('/forgot-password',(req,res) => {
    res.sendFile(__dirname + '/public/forgot-password.html');
});

app.post("/forgot-password", async (req, res) => {    
    const sendEmailTo = req.body["email"];
    const securityCode = req.body["secret"];

    // update users passwordToken field
    if(sendEmailTo === undefined){
        res.send({success: false, message: "EMAIL REQUIRED"});
        return false;
    }
    if(!(await findUser(sendEmailTo))) {
        res.status(500).send({success: false, message: "No user with that email exists"});
        return false;
    }

    await User.findOneAndUpdate({email: sendEmailTo}, {passwordResetToken: securityCode});
    
    const mailData = {
        from: 'umassmacrotracker@gmail.com',  // sender address
        to: sendEmailTo,   // list of receivers
        subject: 'Password Reset Requested for UMass Dining Macro Tracker',
        text: 'That was easy!',
        html: `<p>Hey there!</p><p>Security code: <b>${securityCode}</b> </p>`
    };

    transporter.sendMail(mailData, (error, info) => {
        if(error){
            return console.log("THERE WAS AN ERROR SENDING EMAIL", info);
        }
        res.status(200).send({message: "Mail sent", message_id: info.messageId});
    });

    res.redirect('/reset-password/confirm');
});

app.get("/reset-password", (req, res) => {
    res.sendFile(__dirname + '/public/reset-password.html');
});


app.post("/reset-password", async (req, res) => {
    const newPassword = req.body["newPassword"];
    const email = req.body["email"];

    let q = User.find({email: email});
    let user = (await q.exec())[0];

    user.setPassword(newPassword, (error, user)=> {
        if(error) {
            console.log("COULD NOT RESET PASSWORD");
            res.status(500).send({success:false, error: "THE PASSWORD COULD NOT BE RESET"});
        }
        else {
            user.save();
            console.log("PASSWORD RESET SUCCESSFULLY");
            res.redirect('/sign-in');
        }
    });

});

app.get("/reset-password/confirm", (req, res) => {
    res.sendFile(__dirname + '/public/confirm-reset.html');
});

app.post("/reset-password/confirm", async (req, res) => {
    let email = req.body["email"];
    let secret = req.body["secret"];

    let q = User.find({email: email});
    let user = (await q.exec())[0];

    if(JSON.stringify(user["passwordResetToken"]) === secret && JSON.stringify(user["passwordResetToken"]) !== 9999999){
        await User.findOneAndUpdate({email: email}, {passwordResetToken: 9999999});
        res.status(200);
        res.redirect("/reset-password");
    }else {
        console.log("ERROR CONFIRMING SECURITY CODE");
        res.sendStatus(500);
    }

});

app.post('/user/schema',checkLoggedIn, async (req, res) => {
    const request  = req.body;
    const q = User.find({email: request["email"]});
    const response = await q.exec();
    const data = response[0];
    res.send(data);
});
 

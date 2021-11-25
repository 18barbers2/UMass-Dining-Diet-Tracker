'use strict';

import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import mongoose from 'mongoose';
import { User, Food } from './models/user.js';
import puppeteer from 'puppeteer';
import cron from 'node-cron';
const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/", express.static("public"));

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
        runCronJob();
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

/* Grabs menu from DB, send back to add-food.js. Should send in json format.
1. Get full menu across dining halls from
*/
app.get('/get-food', (req, res) => {
    
    
    let menu = Food.findOne(function (error, docs) {
        if(error) {
            console.log("ERROR FETCHING USER DATA");
        }
        else {
            //console.log(docs.Berkshire);

            res.send(docs);
        }
    });
   // console.log(JSON.stringify(dbFood));
    
});

app.post('/get-food', (req, res) => {
    
    let menu = {};
    menu = Food.find({}, function (error, docs) {
        if(error) {
            console.log("ERROR FETCHING USER DATA");
        }
        else {
            console.log(docs);
            return docs[0];
        }
    });
   // console.log(JSON.stringify(dbFood));
    res.json(menu); //return data for that dining hall, to be stored in global
});
/* CHECKOUT WITH DATABASE
1. Add added items from checkout into "selected items"
2. Send those items to endpoint in server of form {"food" : 1 } (later add multiple functionality)
3. At endpoint, take those items, calculate the total nutrient value from them by accessing food collection and searching for each food
4. With the total nutrients, add/update the user's macros (user->foodHistory->macros->(macroDocument))
*/
/* NOTES:
1. should use user id for updating/adding? How would i get the correct user ID for updating

*/
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

async function retrieveDiningHallFood() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    //final dining hall data for the day
    let diningHallFoodData = {};
    //information of each dining hall and the respective url to visit
    let diningHalls = [
        {'name': "Berkshire", "url": 'https://umassdining.com/locations-menus/berkshire/menu'},
        {'name': "Worcester", "url": 'https://umassdining.com/locations-menus/worcester/menu'},
        {'name': "Franklin", "url": 'https://umassdining.com/locations-menus/franklin/menu'},
        {'name': "Hampshire", "url": 'https://umassdining.com/locations-menus/hampshire/menu'}
    ];

    for (const diningHall of diningHalls) {
        await page.goto(diningHall["url"], {waitUntil: 'networkidle2'});
        //store all of the meals for the dining hall
        let diningHallMealNames = await page.$$eval("ul.etabs > li.tab", (mealTabs) => {
            return mealTabs.map(tab => tab.getAttribute("aria-controls"));
        });
        //check if the dining hall is closed
        if (diningHallMealNames.length <= 1) {
            diningHallFoodData[diningHall['name']] = "Closed";
            continue;
        } else {
            let diningHallFood = {};
            for (let i = 0; i < diningHallMealNames.length; i++) {
                //retrieve the food name and nutrional data for the specific dining hall
                let foodItems = await page.$$eval(`#${diningHallMealNames[i]} a`, (items) => {
                    return items.map(x => {
                        let nutritionObj = {};
                        nutritionObj["calories"] = parseInt(x.getAttribute("data-calories"));
                        //remove the units from the string before converting to a number for each nutrient below
                        nutritionObj["fat"] = parseInt(x.getAttribute("data-total-fat").replace("g", ""));
                        nutritionObj["cholesterol"] = parseInt(x.getAttribute("data-cholesterol").replace("mg", ""));
                        nutritionObj["sodium"] = parseInt(x.getAttribute("data-sodium").replace("mg", ""));
                        nutritionObj["carbohydrates"] = parseInt(x.getAttribute("data-total-carb").replace("g", ""));
                        nutritionObj["sugar"] = parseInt(x.getAttribute("data-sugars").replace("g", ""));
                        nutritionObj["protein"] = parseInt(x.getAttribute("data-protein").replace("g", ""));
                        return {"foodName": x.getAttribute("data-dish-name"), "nutritionFacts": nutritionObj};
                    });
                });
                //store the meal and all the associated foods
                diningHallFood[diningHallMealNames[i]] = foodItems;
            }
            //store all the meals for the day for each dining hall
            diningHallFoodData[diningHall['name']] = diningHallFood;
        } 
    }
    await browser.close();
    return diningHallFoodData;
}

//Retrieves the dining hall food at 3AM each day for each dining hall and stores the food data in the database
function runCronJob() {
    cron.schedule('0 3 * * *', async () => {
        //Runs the job at 03:00 AM at America/New_York timezone
        const food = await retrieveDiningHallFood();
        //check if retrieveDiningHallFood failed
        if (JSON.stringify(food) === '{}') {
            console.log("Failed to retrieve food from the dining halls");
        }
        const diningHallFoods = new Food({
            Berkshire: food['Berkshire'],
            Worcester: food['Worcester'],
            Franklin: food['Franklin'],
            Hampshire: food['Hampshire']
        });
        diningHallFoods.save(function (err) {
            if (err) console.log(err);
        });
    }, {
        scheduled: true,
        timezone: "America/New_York"
    });
} 
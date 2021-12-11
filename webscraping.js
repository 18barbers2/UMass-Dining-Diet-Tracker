import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import { Food } from './models/user.js';

const pass = process.env.PASSWORD || 'cWDxP9BfaqjgzD4';
const dbname = 'umass_diet_tracker_database';
const url = `mongodb+srv://umassdiningdiettracker:${pass}@umassdiningcluster.dxpep.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const connectionParams={useNewUrlParser: true, useUnifiedTopology: true };

try {
    mongoose.connect(url, connectionParams);
    mongoose.connection.once('open',() => {
        runCronJob();
    });
}
catch (error) {
    console.log("ISSUE WITH CONNECTING TO DATABASE");
}

//Retrieves the dining hall food at 3AM each day for each dining hall and stores the food data in the database
async function runCronJob() {
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
    //clear the collection before adding to it
    await Food.deleteMany();
    //update the Foods collection
    diningHallFoods.save(function (err) {
        if (err) console.log(err);
    });
}

//retrieves food and labels from each of the dining halls and returs a json object
async function retrieveDiningHallFood() {
    const browser = await puppeteer.launch({headless: true});
    //open the browser
    const page = await browser.newPage();
    //final dining hall data for the current day
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
        
        //retrieve meal names for the dining hall
        let mealNames = await page.$$eval("ul.etabs > li.tab", (mealTabs) => {
            return mealTabs.map(tab => tab.getAttribute("aria-controls"));
        });

        //check if the dining hall is closed
        if (mealNames.length <= 1) {
            diningHallFoodData[diningHall['name']] = "Closed";
            continue;
        } else {
            let diningHallFood = {};
            for (let i = 0; i < mealNames.length; i++) {
                let mealInfo = [];
                const foodItemsAndLabels = await page.evaluate((selector, i) => {
                    const foodLabelArr = [];
                    const meals = document.querySelectorAll(selector);
                    let element = meals[i];
                    let mealChildren = element.children;
                    for (child of mealChildren) {
                        if (child.className === "menu_category_name") {
                            foodLabelArr.push({"label": child.innerText});
                        } else { //else the element is a food item
                            let nutritionObj = {};
                            const foodItem = (child.children)[0];
                            //retrieve the food name and nutrional data for the specific dining hall
                            nutritionObj["calories"] = parseInt(foodItem.getAttribute("data-calories"));
                            //remove the units from the string before converting to a number for each nutrient below
                            nutritionObj["fat"] = parseInt(foodItem.getAttribute("data-total-fat").replace("g", ""));
                            nutritionObj["cholesterol"] = parseInt(foodItem.getAttribute("data-cholesterol").replace("mg", ""));
                            nutritionObj["sodium"] = parseInt(foodItem.getAttribute("data-sodium").replace("mg", ""));
                            nutritionObj["carbohydrates"] = parseInt(foodItem.getAttribute("data-total-carb").replace("g", ""));
                            nutritionObj["sugar"] = parseInt(foodItem.getAttribute("data-sugars").replace("g", ""));
                            nutritionObj["protein"] = parseInt(foodItem.getAttribute("data-protein").replace("g", ""));
                            foodLabelArr.push({"foodName": foodItem.getAttribute("data-dish-name"), "nutritionFacts": nutritionObj});
                        }
                    }
                    return foodLabelArr;
                }, '#content_text', i);
                
                //store the meal and all the associated labels and foods
                diningHallFood[mealNames[i]] = foodItemsAndLabels;
            }
            //store all the meals for the day for each dining hall
            diningHallFoodData[diningHall['name']] = diningHallFood;
        } 
    }
    await browser.close();
    return diningHallFoodData;
}

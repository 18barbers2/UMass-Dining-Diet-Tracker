# Documentation for Database
Schema
# user document 
{
	_id: <ObjectId1>,
	username: String, // the user’s name
	firstName: String, // first name
	lastName: String, // last name
	email: String, // user’s email
    password: Array [String, String] // salt and hash for password
	macroHistory: Array, // a document with nutritional values for each day
	nutritionGoals: Object // a document with the users preferred nutritional goals
}

## macroHistory document
{
	date: String, // the specific date for this document
	macros: <MacroDocument> // a document with all the nutritional values the user has for the date.	
}

## macroHistory` document 
{
	calorieTotal: integer, // the total number of calories consumed for this day
	carbohydratesTotal: integer, // the total number of carbohydrates consumed for this day
	fatTotal: integer, // the total fat consumed for this day
	sodiumTotal: integer, // the total sodium consumed for this day
	cholesterolTotal: integer, // the total cholesterol consumed for this day
	sugarTotal: integer, // the total sugar consumed for this day
	proteinTotal: integer, // the total protein consumed for this day
}

## goals document
{
    calories: integer, // the daily calorie goal
	carbohydrates: integer, // the daily carbohydrates goal
	fat: integer,  // the daily fat goal
	sodium: integer,  // the daily sodium goal
	cholesterol: integer,  // the daily cholesterol goal
	sugar: integer,  // the daily sugar goal
	protein: integer,  // the daily protein goal
}

## dining hall document
{
    Berkshire: {
        meals: {
            foodItem:{
                name: String,
                calories: integer, // calories
	            carbohydrates: integer, // carbohydrates
	            fat: integer,  // fat
	            sodium: integer,  // sodium
	            cholesterol: integer,  // cholesterol
	            sugar: integer,  // sugar
	            protein: integer  // protein
            }
        }
    }
    Worcester:{
        meals: {
            foodItem:{
                name: String,
                calories: integer, // calories
	            carbohydrates: integer, // carbohydrates
	            fat: integer,  // fat
	            sodium: integer,  // sodium
	            cholesterol: integer,  // cholesterol
	            sugar: integer,  // sugar
	            protein: integer  // protein
            }
        }
    }
    Franklin:{
        meals: {
            foodItem:{
                name: String,
                calories: integer, // calories
	            carbohydrates: integer, // carbohydrates
	            fat: integer,  // fat
	            sodium: integer,  // sodium
	            cholesterol: integer,  // cholesterol
	            sugar: integer,  // sugar
	            protein: integer  // protein
            }
        }
    }
    Hampshire:{
        meals: {
            foodItem:{
                name: String,
                calories: integer, // calories
	            carbohydrates: integer, // carbohydrates
	            fat: integer,  // fat
	            sodium: integer,  // sodium
	            cholesterol: integer,  // cholesterol
	            sugar: integer,  // sugar
	            protein: integer  // protein
            }
        }
    }
}

# Division of Labor
### Sam
- Helped plan the Database schema.
- Developed authentication functionality using SHA 256
- Refactored existing Javascript code to work with database functionality.
    - Profile.js. Added logic for saving to database
    - Sign-in.js Added authentication using database cross referencing
    - Server.js Worked on endpoints for profile and sign in and home etc.
- Wrote milestone3.md
- Helped fix the structure of code to work with heroku.

### Jake
- Made table in add-food.html checkout section to more easily edit food in js
- Made another table for food display + function to add a food to it
- Made meal buttons and and dining hall buttons display correct food information
- Calculated total macros for checkout food, sent to endpoint which updates the user’s total intake in the database
### Ilya
- Organized local storage, including server.js, to remove bugs
- Got graphs working on homepage
- Finished web scraping code that Sam started
- Implemented the cron job function to update the food database at 3am every morning 
- Helped Sam develop database integration with front end files
- Helped Sam develop authentication functionality

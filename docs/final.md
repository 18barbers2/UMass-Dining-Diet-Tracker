Ex: https://github.com/326-queue/project/blob/development/docs/submission_final.md
### Team Name
Team Gimel

### Application Name
Umass Dining Diet Tracker

### Semester
Fall 2021

### Team Overview

Sam Barber: 18barbers2
Ilya Pindrus: ilya-pindrus
Jakob Parkinson: jakobparkinson 

### Application Overview
Our application allows users to track what they eat at the dining halls of UMass. Knowing the foods and their nutritional values people eat at dining halls is tricky and not easily done with traditional food trackers. Our application acts as a specialization for UMass students who want to track what they eat without the hassle of manually looking up the menu and individual foods. Additionally, the nutritional values we use are accurate; they come from UMass itself. 
Our application is innovative in its simplicity and utility for UMass students. Diet trackers exist; UMass dining diet trackers did not, until now. Congregating the nutritional information provided by UMass into a simple to use tracker can allow students to easily understand what is going into their body.

# User Interface
- Sign In Page
The sign in page allows the users to enter their email address and password in order to login to their account. In the event that they forgot their password, there is a link to help the user to reset their password. In case the user is new to the application, there is a link to help the user register an account. 

- Create an Account Page
The create account page requires the users to enter their data in order to create an account. Some fields such as first and last name are collected in order to provide a more personalized experience for the user when using the app. Furthermore, there are checks for fields such as email and confirm password in order to make registering for an account easier. 

- Forgot Password Page
The forgot password page allows the user to enter their email so an email can be sent to them with a security code 

- Confirm Reset Page
The confirm reset page requires the user to enter the security code received from the email and checks that it is valid. If so, it then redirects the user to the reset password page

- Reset Password Page
The reset password page allows the user to reset their password. There are checks in place to make sure the user is confident with the password they entered. Afterwards, they are redirected to the sign in page.   

- Home Page
The homepage is the section of the user interface where the user is able to see all of their macronutrient data. Two graphs will display their calories consumed over time as well as their weight over time.  Furthermore, the user will also be able to see their progress towards their nutrient goals on the right hand side of the page with a total progress counter at the bottom.

- Add Food Page
The add food page allows the user to select from one of 4 dining halls at which they dined at. Next, they are able to select from either breakfast, lunch, dinner, late night, or gran-and-go. Afterwards, they will be presented with the current foods served at the selected dining hall in which they are able to select which and how many foods they ate. Afterwards, the foods they select will be available in the checkout box as a final check to ensure that the user is satisfied with the food they have chosen. After clicking the checkout button, the user is able to navigate to the home page where they will see their nutrient totals increased.

- Profile Page
The profile page allows the user to set their goals for the 7 macronutrients we track on the app.In case the user cannot decide, there is an avg button which sets the amount of the specific macronutrient to the average intake of an American. The user's current goals for each macronutrient is displayed in the text box.  

# APIs
‘/’ -> Redirects to the sign-in endpoint

‘/logout/ -> Logs the user out, sends them to the sign-in page

'/sign-in/' -> Serves the sign-in.html page.

'/login/:email/' -> Finds users name based on email param, and returns all their personal nutritional data.

'/checkout-food/’ -> Serves the ‘/checkout-food/:userID’ page, based on the user ID.

‘/checkout-food/:userID/’ -> Serves the add-food.html page if the user’s ID is equal to their email. Otherwise, redirects back to checkout-food.

‘/get-food/’ -> 	Retrieves the Food schema from the mongoDB database.

'/checkout-add/' -> Takes input from selected foods on the add-food page, then returns the aggregate nutritional values from those food items.

'/home/' -> Redirects to /home/:userID/ endpoint.

‘/home/:userID/’ -> Serves the home.html page with the information of the user.

'/profile/' -> Redirects to the ‘/profile/:userID’ endpoint.

‘/profile/:userID’ -> Serves the profile.html page for the current user.

‘/profile/update/’ -> Update the user’s goals based on what they set in the profile.html page.

'/create-account/' -> Serves the user with the create-account.html page. Takes in the request with user account information, and adds a new default user to the database.

'/create-account/' -> 
'/forgot-password/' -> Serves the user with the forgot-password.html file. Updates user’s security code and sends an email to the user’s email address

‘/reset-password/’ -> Serves the reset-password.html page. Resets the user’s password with a new one the user chooses

‘/reset-password/confirm/’ -> serves the confirm-reset.html page

‘/user/schema/’ -> If authenticated, returns the user data for the logged in user.

# Database
Schema
user document 
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

macroHistory document
{
	date: String, // the specific date for this document
macros: <MacroDocument> // a document with all the nutritional values the user has
for the date.	
}

macroHistory document 
{
	calorieTotal: integer, // the total number of calories consumed for this day
	carbohydratesTotal: integer, // the total number of carbohydrates consumed for this
day
	fatTotal: integer, // the total fat consumed for this day
	sodiumTotal: integer, // the total sodium consumed for this day
	cholesterolTotal: integer, // the total cholesterol consumed for this day
	sugarTotal: integer, // the total sugar consumed for this day
	proteinTotal: integer, // the total protein consumed for this day
}

goals document
{
    calories: integer, // the daily calorie goal
	carbohydrates: integer, // the daily carbohydrates goal
	fat: integer,  // the daily fat goal
	sodium: integer,  // the daily sodium goal
	cholesterol: integer,  // the daily cholesterol goal
	sugar: integer,  // the daily sugar goal
	protein: integer,  // the daily protein goal
}

dining hall document
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

URL Routes/Mappings
https://umass-dining-diet-tracker.herokuapp.com/sign-in
Routes to the sign-in page, where the user logs in
https://umass-dining-diet-tracker.herokuapp.com/create-account
Routes the the create account page, where the user can choose to make a new account
https://umass-dining-diet-tracker.herokuapp.com/forgot-password
Routes to the forgot password page, where the user can input their email to get a security code
https://umass-dining-diet-tracker.herokuapp.com/confirm-reset
Routes to the password reset confirmation page, to make sure the user wants to reset their password
https://umass-dining-diet-tracker.herokuapp.com/reset-password
Routes to the page to reset a password, where they can choose a new password to use
https://umass-dining-diet-tracker.herokuapp.com/home
Routes the the home page, where general information about the user is stored
https://umass-dining-diet-tracker.herokuapp.com/add-food
Routes to the add-food page, where the user can add food from the dining halls
https://umass-dining-diet-tracker.herokuapp.com/profile
Routes to the profile page, where the user can set their goals and weight
Authentication/Authorization
UMass Dining tracker uses Passport, Express-Session, and Passport-local-mongoose for authentication. The mongoose passport allows us to authenticate requests for the database.

When logging in, if the user passes authentication, they will be redirected to the home page. This allows them to see their statistics that have been tracked in the past. If a user is unable to login successfully and would like to reset their password, we have a page for that. The user enters the email address of their account, and if a user is found, and email will be sent with a security code that they will need to input in the security code field. If the security code is successfully authenticated, the user can enter a new password and will be directed back to the sign-in page.

Division of Labor
Wireframe (md 1)
### Data Interactions
Sam, Ilya, Jake

### Wireframe
Sam, Ilya, Jake

### Website
- Homepage
    - Sam, Ilya
- Food Page
    - Jake
- Profile Page
    - Sam
- Sign in Page
    - Ilya
- Create an Account Page
    - Sam
- Forgot Password Page
    - Ilya

md2
Sam: Implemented profile, and home endpoints, as well as how data is temporarily saved between web pages. Resolved some issues with HTML, and updated values on the home page. Helped write a milestone2.md file. Helped setup heroku and bugfix the deployment. 

Ilya: Implemented sign-in, create-account, delete/password endpoints. Helped write milestone2.md file. Helped organize how to handle users data. Helped setup heroku and bugfix the deployment.

Jake: Added three endpoints (checkout-food, checkout-add, sign-in) to be used by respective js files. Changed links in navbar of 3 pages so they use endpoints to serve the page, rather than using html files. Created add-food.js, which provides functionality to the add-food page (like working checkboxes, DOM surgery on add-food.html, processing food names, etc.), and correctly sends data to localstorage.


md3
### Sam
- Helped plan the Database schema.
- Developed authentication functionality using SHA 256
- Refactored existing Javascript code to work with database functionality.
    - Profile.js. Added logic for saving to database
    - Sign-in.js Added authentication using database cross referencing
    - Server.js Worked on endpoints for profile and sign in and home etc.
- Wrote milestone3.md
- Helped fix the structure of code to work with heroku.
Setup the mongodb database for allowing us to save user information. 

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

Conclusion 
Our experience on this project was difficult, but rewarding. Throughout working on each milestone and finally on the final submission, we learned a lot about how an application works. Creating an application is more than just programming - it’s also about team communication and understanding the many interweaving parts of backend and frontend. None of us had any substantial experience with web programming other than what was learned in class, so we had plenty of struggles and learning throughout the semester. For example, we learned the many steps it takes to make a functioning application. 
From planning using wireframe to debugging DOM and authentication, every step we took was difficult, but necessary in furthering our experience as programmers. We learned, and had difficulties implementing: how to incorporate Bootstrap into our frontend; express for serving our files and endpoints; how authentication works and how to incorporate it with logging in; web scraping information from a website; and how to use CRUD operations for mongoDB. 
Despite this experience, we were able to persevere because we could communicate well.
We would have benefited knowing some things before we began our project. In particular, more knowledge in how backends and express worked would have helped immensely, as it serves as the backbone of our project - all information flows through it. Additionally, knowing the basics of authentication and file serving would have made our lives easier, as the way they interact gave us many hours of technical hardship.
Overall, the knowledge gained throughout the semester working on our app will certainly benefit us in the future - especially if it pertains to the inner workings of websites. 

# Rubric

### Team Gimel UMass Diet Tracker Project Rubric

### Front-End Features: __/(30)

- Login Page: __/(5)
Provides fields for the user to login to their personal account using their username and password. 
“Create an Account” and “Reset Password” links exists in case the user is new to the application or forgot their password
- Create an Account Page:  __/(5)
Provides the user with the necessary fields to create an account such as “Name”, “Email”, “Username”, and “Password”
- Reset Password Page:  __/(5)
Contains a simple field for the user to enter their email address. After the button is clicked, an email is sent for the user to reset their password
Using the code from the email, the user is able to reset their password for their account
- Home Page:  __/(5)
Contains 2 graphs. One monitoring the users caloric intake over a period of time and another monitoring the users weight over a period of time. 
Contains a grouping of 7 progress bars monitoring the amount of seven important macronutrients the user consumed that current day.  
- Profile Page:  __/(5)
Contains fields for users to update their macronutrient goals as well as a field to log their current weight. 
Updated nutrition goals are reflected in the users homepage
- Add-food page:  __/(5)
Buttons for each dining hall and meal time are used to navigate the menus
Display section shows the menu, with labels, for a given dining hall and time, while the checkout section allows users to add which food they ate to their profile
### Back-End Features: __/(30)

- Endpoints: __/(10)
File Serving Endpoints: “/sign-in”, “/create-account”, “/home”, “/checkout-food”, “/profile
Serves html file after authenticating user, user is unable to go to another users page
 Endpoints using Post requests: “/create-account”, “/checkout-add'”, “/profile”, “/delete/password”, 
Endpoints query the database to obtain either user or food information 
- Login Verification: __/(5)
Users are only able to access their own pages, if they attempt to access another users page, they will be redirected to their own.
- Graphs: __/(3)
Both calorie and weight over time graphs query the database to display the last 7 days of their total calories consumed and current weight respectively. 
- DOM Surgery for Add-Food Page: __/(10)
Reads all menus from the database and adds them to a table to display them based on which meal and hall buttons are clicked
Checking out sends selected foods to the backend to store as nutrients, unchecks the selected foods, and removes the food table from the checkout table.
Clicking a checkbox adds that food to the checkout list work, while unchecking removes it from the checkout list
- Web Scraping of UMass Dining Website: __/(2)
Heroku calls a cron job to be run at 3AM each day to update the food database
### Database Features: __/(30)
- Connects to Database: __/(2)
Database connects before the server starts up
- Stores all the foods in the dining halls from web-scraping data: __/(6)
Stores the food for each meal from the data retrieved by web-scraping the UMASS dining website for the Worcester, Franklin, Hampshire, and Berkshire dining halls
- Access database in add-food page: __/(8)
Retrieves the menu for all dining halls from the database, which is then parsed and displayed
- Access user data in database for charts on homepage: __/(6) 
Database holds the users macrohistory which the charts use to plot with
Offline access to database during cron job after web scraping: __/(6) 
- CRUD: __/(5)
- Create: __/(2)
Create a user account
Create an entry for the users macro history when checking out food in the add food page
- Read: __/(1)
Read the users stored information for updating the graphs on the homepage and the macronutrient progress bars
- Update: __/(1)
Update the users nutrient goals as well as their current weight from the profile page
- Delete: __/(1)
Deletes a users password when they choose to reset their password

### General:__/(5)
- Video demo: __/(2) 
Video is 5-7 minutes long and shows off the important features of the project
- Rubric: __/(1)
Fair and covers all of the important aspects of the project
- Heroku Hosting: __/(1)
Final Project is able to be hosted on heroku and accessed via a link
- Follows best code practices: __/(1)
Commented code




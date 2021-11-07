# Milestone 2 Team Gimel

# Project API Planning
### Endpoints

'/sign-in/' -> Serves the sign-in.html page.

'/login/:email/' -> Finds users name based off email param, and returns all their personal nutritional data.

'/checkout-food/ -> Serves the user the add-food.html file.

'/checkout-add/' -> Takes input from selected foods on add-food page, then returns the aggregate nutritional values from those food items.

'/home/' -> Serves the client with the home.html page.

'/profile/' -> Serves the profile.html page to the user.

'/create/account' -> Takes in the request with user account information (we'll use a database here later).

'/delete/password' -> Takes request from client and deletes the password from the database for that user. Then the user will reset their password.

'/forgot-password/' -> Serves the user with the forgot-password.html file.

'/create-account/' -> Serves the user with the create-account.html page.

# CRUD Operations

### Create
When the users first start using the web app, they will have to create an account. We use the '/create/account/' endpoint to perform this operation.
![image](milestone2-res/create-op.png)

### Read
The 7 fields on the 'home' page, representing daily nutritional values, read from some database (eventually) to track the nutrients the user consumes throughout the day.
![image](milestone2-res/create-op.png)

### Update
The 'Profile' page, updates values in our database for the nutritional goals on our homepage. 
![image](milestone2-res/update-op.png)

### Delete
When the user forgets their password the '/delete/password' endpoint tells the database to delete the users password.
![image](milestone2-res/delete-op.png)

# Heroku Hosted Application
https://git.heroku.com/umass-dining-diet-tracker.git

# Division of Labor

Sam: Implemented profile, and home endpoints, as well as how data is temporarily saved between webpages. Resolved some issues with HTML, and updated values on home page. Helped write milestone2.md file. Helped setup heroku and bugfix the deployment.

Ilya: Implemented sign-in, create-account, delete/password endpoints. Helped write milestone2.md file. Helped organize how to handle users data. Helped setup heroku and bugfix the deployment.

Jake: Added three endpoints (checkout-food, checkout-add, sign-in) to be used by respective js files. Changed links in navbar of 3 pages so they use endpoints to serve the page, rather than using html files. Created add-food.js, which provides functionality to the add-food page (like working checkboxes, DOM surgery on add-food.html, processing food names, etc.), and correctly sends data to localstorage. 
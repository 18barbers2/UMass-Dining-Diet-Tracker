'use strict';

import mongoose from 'mongoose';

// make sure to put your own password in
const pass = '';
const dbname = 'umass_diet_tracker_database';
const url = `mongodb+srv://umassdiningdiettracker:${pass}@umassdiningcluster.dxpep.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    macroHistory: [{
        date: String,
        caloriesTotal: Number,
        proteinTotal: Number,
        carbohydratesTotal: Number,
        cholesterolTotal: Number,
        fatTotal: Number,
        sodiumTotal: Number,
        sugarTotal: Number,
        weightTotal: Number
    }],
    nutritionGoals : {
        calories: Number,
        protein: Number,
        carbohydrates: Number,
        cholesterol: Number,
        fat: Number,
        sodium: Number,
        sugarTotal: Number
    }
});

async function getUserData(userName) {


    // probably do some authentication things

    // set connection parameters
    const connectionParams={useNewUrlParser: true,useUnifiedTopology: true }

    // attempt to connect to database with connection params
    try {
        await mongoose.connect(url, connectionParams);
        console.log(`Successfull connected to url: ${url}`);
    }
    catch (error) {
        console.log(error);
    }
    
    // make a mongoose.model, the userSchema defines what the returned json will look like (or the pushed json)
    const user = mongoose.model('users', userSchema);

    user.find({username: userName}, (err, result) =>  {

        if(err){
            console.log(`There was an error getting users data: Error => ${err}`)
        }
        else {
            // console.log(`first name: ${result[0].lastName}, last name${result[0].firstName} || ${result[0]["macroHistory"]}`);
            console.log(result)
            console.log(result[0]._doc);
            // return something
        }
    });
}

getUserData("goofyrocks101");
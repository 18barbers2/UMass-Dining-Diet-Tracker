import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    macroHistory: {
        type: Array, 
        default: [{
            date: date,
            caloriesTotal: 0,
            proteinTotal: 0,
            carbohydratesTotal: 0,
            cholesterolTotal: 0,
            fatTotal: 0,
            sodiumTotal: 0,
            sugarTotal: 0,
            weightTotal: 0
        }]
    },
    nutritionGoals : {
        calories: {
            type: Number, 
            default: 200
        },
        protein: {
            type: Number,
            default: 50
        },
        carbohydrates: {
            type: Number,
            default: 300
        },
        cholesterol: {
            type: Number,
            default: 250
        },
        fat: {
            type: Number,
            default: 50
        },
        sodium: {
            type: Number,
            default: 3400
        },
        sugar: {
            type: Number,
            default: 125
        }
    },
    passwordResetToken: Number
},);

const foodSchema = new Schema({
    Berkshire: Schema.Types.Mixed,
    Worcester: Schema.Types.Mixed,
    Franklin: Schema.Types.Mixed,
    Hampshire: Schema.Types.Mixed
});


userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

const User = mongoose.model('User', userSchema);
const Food = mongoose.model('Food', foodSchema);


export {User, Food};

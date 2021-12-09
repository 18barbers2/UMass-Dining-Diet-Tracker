import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

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
    }
}, );

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

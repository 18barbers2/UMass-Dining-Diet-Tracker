import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: [String, String],
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
        sugar: Number
    }
}, );

const User = mongoose.model('User', userSchema);

export {User};
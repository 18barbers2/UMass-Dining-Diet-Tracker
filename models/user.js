import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

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

const foodSchema = new Schema({
    Berkshire: Schema.Types.Mixed,
    Worcester: Schema.Types.Mixed,
    Franklin: Schema.Types.Mixed,
    Hampshire: Schema.Types.Mixed
});

User.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
const Food = mongoose.model('Food', foodSchema);

export {User, Food};

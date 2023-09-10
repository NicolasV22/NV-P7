const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/* Model user: utilisation de uniqueValidator -> unique : true sur l'adresse mail afin de garantir que chaque adresse mail est UNIQUE */

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
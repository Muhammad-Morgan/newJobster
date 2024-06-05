const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    location: String,
    password: String,
    type: String,
    myID: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
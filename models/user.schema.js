/* eslint-disable new-cap */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please provide Username'],
    },
    email: {
        type: String,
        required: [true, 'Please provide a unique email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    
});
const User = new mongoose.model('user', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required',
        minlength: 1,
        maxlength: 15
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is required',
        minlength: 1,
        maxlength: 15
    }
})
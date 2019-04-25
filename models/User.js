const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { // used for login
        type: String,
        trim: true,
        unique: true,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    },
    username: { // name to be displayed
        type: String,
        trim: true,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    password: { 
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    selling: [{ //list of merchandise selling by user
        type: Schema.Types.ObjectId,
        ref: 'Merchandise',
    }],
    bought: [{ //list of merchandise bought by user
        type: Schema.Types.ObjectId,
        ref: 'Merchandise',
    }],
    favorited: [{ //list of merchandise favorited by user
        type: Schema.Types.ObjectId,
        ref: 'Merchandise',
    }]
});

// Encrypt password before saving
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10)
    .then(function(hashed) {
        user.password = hashed;
        next();        
    })
    .catch(function(err) {
        res.json({status: 'error', message: err});
    });
});

module.exports = mongoose.model('User', UserSchema);
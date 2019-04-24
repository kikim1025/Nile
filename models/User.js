import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

let UserSchema = new Schema({
    email: { // used for login
        type: String,
        trim: true,
        unique: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 'Wrong email format']
    },
    username: { // name to be displayed
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

export default mongoose.model('User', UserSchema);
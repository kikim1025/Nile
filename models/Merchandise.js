const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MerchandiseSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'Username is required',
        minlength: 1,
        maxlength: 15
    },
    description: {
        type: String,
        trim: true,
        required: 'Password is required',
        minlength: 1,
        maxlength: 300
    },
    //number left
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }    
});

module.exports = mongoose.model('Merchandise', MerchandiseSchema);
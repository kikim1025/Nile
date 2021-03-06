const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MerchandiseSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        maxlength: 300
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 999
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }    
});

module.exports = mongoose.model('Merchandise', MerchandiseSchema);
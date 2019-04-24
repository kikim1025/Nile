const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MerchandiseSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'Merchandise name is required',
        minlength: 1,
        maxlength: 15
    },
    description: {
        type: String,
        trim: true,
        required: 'Description is required',
        minlength: 1,
        maxlength: 300
    },
    stock: {
        type: Number,
        required: 'Stock is required',
        min: 0,
        max: 999
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: 'Owner is required',
        ref: 'User'
    }    
});

module.exports = mongoose.model('Merchandise', MerchandiseSchema);
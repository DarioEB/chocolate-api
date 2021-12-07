const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    },
    price: {
        type: Number,
        required: true
    },
    priceAllDay: {
        type: Number,
        required: true
    },
    services: {
        type: Array
    },
    images: {
        type: Array
    },
    route: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Room', roomSchema);


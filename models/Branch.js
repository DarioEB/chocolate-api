const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    route: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Branch', branchSchema);
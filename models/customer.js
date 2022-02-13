const mongoose = require('mongoose');

const customerShema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        minlenght: 5,
        maxlenght: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Customer = mongoose.model('Customer', customerShema);

exports.Customer = Customer;
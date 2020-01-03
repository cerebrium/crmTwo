const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    manager: {
        type: Boolean
    },
    amountDue: {
        type: Number
    },
    milesDriven: {
        type: Number
    },
    hoursWorked: {
        type: Number
    },
    payed: {
        type: Number
    }
})

module.exports = mongoose.model('User', userSchema)
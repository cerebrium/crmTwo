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
    calDate: {
        type: Array
    }, 
    milesDriven: {
        type: Array
    },
    firstDeliveryTime: {
        type: Array
    },
    startMileage: {
        type: Array
    },
    lastDeliveryTime: {
        type: Array
    },
    finishMileage: {
        type: Array
    },
    routeNumber: {
        type: Array
    },
    location: {
        type: String
    },
    numberOfParcelsDelivered: {
        type: Array
    },
    returnBackTime: {
        type: Array
    },
    numberOfParcelsBroughtBack: {
        type: Array
    },
    ownerVehicleRegistration: {
        type: Array
    },
    amountDue: {
        type: Array
    }
})

module.exports = mongoose.model('User', userSchema)
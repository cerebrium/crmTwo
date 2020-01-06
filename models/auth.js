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
        type: Object
    }, 
    milesDriven: {
        type: Number
    },
    firstDeliveryTime: {
        type: String
    },
    startMileage: {
        type: String
    },
    lastDeliveryTime: {
        type: String
    },
    finishMileage: {
        type: String
    },
    routeNumber: {
        type: String
    },
    location: {
        type: String
    },
    numberOfParcelsDelivered: {
        type: String
    },
    returnBackTime: {
        type: String
    },
    numberOfParcelsBroughtBack: {
        type: String
    },
    ownerVehicleRegistration: {
        type: String
    },
    amountDue: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)
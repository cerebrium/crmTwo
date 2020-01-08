const express = require('express');
const router = express.Router();
const User = require('../models/auth')

    // grabbing the user deatils
    router.get('/initial/:id', (req, res) => {
        console.log('in the billpay route')
        User.findById(req.params.id, (err, user) => {
            res.json(user)
        })
    })

    // Saving the data route
    router.post('/edit', (req, res) => {
        console.log(req.body)
        User.findById(req.body.id, (err, user) => {
            // Miles Driven  
            let milesDrivenCopy = [...user.milesDriven]
            milesDrivenCopy.push(req.body.milesDriven)
            user.milesDriven = milesDrivenCopy

            // The date field 
            let calDateCopy = [...user.calDate]
            calDateCopy.push(req.body.calDate)
            user.calDate = calDateCopy

            // Time stamp for first delivery of package 
            let firstDeliveryTimeCopy = [...user.firstDeliveryTime]
            firstDeliveryTimeCopy.push(req.body.firstDeliveryTime)
            user.firstDeliveryTime = firstDeliveryTimeCopy

            // The mileage on the car initially 
            let startMileageCopy = [...user.startMileage]
            startMileageCopy.push(req.body.startMileage)
            user.startMileage = startMileageCopy

            // Delivery time for first package
            let lastDeliveryTimeCopy = [...user.lastDeliveryTime]
            lastDeliveryTimeCopy.push(req.body.lastDeliveryTime)
            user.lastDeliveryTime = lastDeliveryTimeCopy

            // Mileage on the car for the last delivery
            let finishMileageCopy = [...user.finishMileage]
            finishMileageCopy.push(req.body.finishMileage)
            user.finishMileage = finishMileageCopy

            // route number for the delivery route
            let routeNumberCopy = [...user.routeNumber]
            routeNumberCopy.push(req.body.routeNumber)
            user.routeNumber = routeNumberCopy

            // Location that the deliveries took place
            let locationCopy = [...user.location]
            locationCopy.push(req.body.location)
            user.location = locationCopy

            // Number of parcels delivered
            let numberOfParcelsDeliveredCopy = [...user.numberOfParcelsDelivered]
            numberOfParcelsDeliveredCopy.push(req.body.numberOfParcelsDelivered)
            user.numberOfParcelsDelivered = numberOfParcelsDeliveredCopy

            // Ruturn time for the vehicle
            let returnBackTimeCopy = [...user.returnBackTime]
            returnBackTimeCopy.push(req.body.returnBackTime)
            user.returnBackTime = returnBackTimeCopy

            // Number of Parcels that Were Not Delivered
            let numberOfParcelsBroughtBackCopy = [...user.numberOfParcelsBroughtBack]
            numberOfParcelsBroughtBackCopy.push(req.body.numberOfParcelsBroughtBack)
            user.numberOfParcelsBroughtBack = numberOfParcelsBroughtBackCopy

            // Registration for the owner of the vehicle
            let ownerVehicleRegistrationCopy = [...user.ownerVehicleRegistration]
            ownerVehicleRegistrationCopy.push(req.body.ownerVehicleRegistration)
            user.ownerVehicleRegistration = ownerVehicleRegistrationCopy

            // Amount to be payed
            let amountDueCopy = [...user.amountDue]
            amountDueCopy.push(req.body.amountDue)
            user.amountDue = amountDueCopy

            user.save()
            console.log(user)
            res.json('succesful update')
        })
    })

module.exports = router;
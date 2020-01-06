const express = require('express');
const router = express.Router();
const User = require('../models/auth')

    router.get('/initial/:id', (req, res) => {
        console.log('in the billpay route')
        User.findById(req.params.id, (err, user) => {
            res.json(user)
        })
    })

    router.post('/edit', (req, res) => {
        console.log(req.body)
        User.findById(req.body.id, (err, user) => {
            user.milesDriven = req.body.milesDriven,
            user.calDate = req.body.calDate,
            firstDeliveryTime = req.body.firstDeliveryTime,
            startMileage = req.body.startMileage,
            lastDeliveryTime = req.body.lastDeliveryTime,
            finishMileage = req.body.finishMileage,
            routeNumber = req.body.routeNumber,
            location = req.body.location,
            numberOfParcelsDelivered = req.body.numberOfParcelsDelivered,
            returnBackTime = req.body.returnBackTime,
            numberOfParcelsBroughtBack = req.body.numberOfParcelsBroughtBack,
            ownerVehicleRegistration = req.body.ownerVehicleRegistration,
            amountDue = req.body.amountDue
            user.save()
            console.log(user)
            res.json('succesful update')
        })
    })
module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/auth')

// Storing user data in the database for team creation and checking
router.post('/signup', (req, res) => {
    // find user based on email
    console.log('in the signup route')
    User.findOne({ email: req.body.email }, (err, user) => {
        // if user found wont write anything, else going to write to db
       if (user) {
           res.json(user)
       } else {
            let user = new User(req.body)
            user.save();
            res.json(user)
       }
    })
})

// add user data in the database for team creation and checking
router.post('/add', (req, res) => {
    // find user based on email
    console.log('in the signup route')
    User.findOne({ email: req.body.email }, (err, user) => {
        // if user found wont write anything, else going to write to db
       if (user) {
           res.json(user)
       } else {
            let user = new User(req.body)
            user.manager = false
            user.save();
            res.json(user)
       }
    })
})

// get all the managers
router.get('/super', (req, res) => {
    console.log('in the super route')
    User.find({ manager: true }, (err, managers) => {
        res.json(managers)
    })
})

// make the user a manager
router.post('/manager', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        // add the manager boolean
        user.manager = req.body.isManager
        user.save()
        res.json(user)
    })
})

// grabbing users associated with places
router.post('/location', (req, res) => {
    User.find({location: req.body.location}, (err, users) => {
        if (users.length) {
            res.json(users)
        }
    })
})

// get all the drivers in system
router.get('/alldrivers', (req, res) => {
    User.find({ manager: false }, (err, users) => {
        res.json(users)
    })
})

module.exports = router;
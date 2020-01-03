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

router.post('/manager', (req, res) => {
    console.log('in the manager route', req.body)
    User.findOne({ email: req.body.email }, (err, user) => {
        // add the manager boolean
        console.log('found a user', user)
        user.manager = req.body.isManager
        user.save()
        res.json(user)
    })
})

router.get('/alldrivers', (req, res) => {
    console.log('in the all users section', req.body)
    User.find({ manager: false }, (err, users) => {
        console.log(users)
        res.json(users)
    })
})

module.exports = router;
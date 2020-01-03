require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')

const app = express();

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Database stuff
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.once('open', () => {
    console.log(`connected to MongoDb on ${db.host}:${db.port}...`)
})
db.on('error', (err) => {
    console.log(`Database Error:\n ${err}`)
})

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/billpay', require('./routes/billpay'));
app.use(express.static(__dirname + '/client/build'));

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(process.env.PORT, () => {
    console.log('server runningon port: ', process.env.PORT)
})
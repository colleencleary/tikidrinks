// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')
const app = express();

// Middleware
app.use(session({
    secret:'soletsgonowhere',
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

// Drinks Controller
const DrinksController = require('./controllers/drinks.js')
app.use('/drinks', DrinksController)

// Sessions Controller
const SessionsController = require('./controllers/sessions.js')
app.use('/sessions', SessionsController)

// Users controller
const UsersController = require('./controllers/users.js')
app.use('/users', UsersController)


// Mongoose Connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/tipsytiki";
mongoose.connect( mongoUri, { useNewUrlParser: true }
);

// Port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening");
});

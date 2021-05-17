require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

//Importing models
require("../model/user");
require("../model/rating");

//routes imports
const homeRoute = require('../routes/home');



app.use(session({
  name: "session-id",
  secret: process.env.jwt_key, // Secret key,
  saveUninitialized: false,
  cookie : {
      maxAge: 1000 * 60 * 60 * 24 * 365
  },
  resave: false
}));

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

//middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//setting view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '../../public'));

//middleware routes
app.use('/',homeRoute);

module.exports = app;



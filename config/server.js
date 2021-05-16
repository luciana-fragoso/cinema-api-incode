const express = require('express');

const app = express();

//Importing models
require("../model/user");
require("../model/rating");

//routes imports
const homeRoute = require('../routes/home');


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
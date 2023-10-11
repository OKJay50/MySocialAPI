// Import required modules and packages
const express = require('express');
const mongoose = require('mongoose');
const routes = require('routes');

// Set up the Express.js Application
const app = express();
const PORT = process.env.PORT ||3001;

//Define Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Serve static assets (if needed)
//app.use(express.static('public'));

// Mongo Time
mongoose.connect('mongodb://localhost:27017/social-network',{
    useFindAndModify: false,
    useNewUrlPraser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

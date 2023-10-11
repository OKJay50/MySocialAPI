// Import required modules and packages
const express = require('express');
const mongoose = require('mongoose');
const routes = require('routes');

// Set up the Express.js Application
const app = express();
const PORT = process.env.PORT || 3001;

//Define Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Serve static assets (if needed)
//app.use(express.static('public'));

// Mongo Time
mongoose.connect('mongodb://localhost:27017/MySocialAPI', {
    appname: 'MySocialAPI',
    connectionTimeout: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// Log MongoDB connection status
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

//Log MongoDB errors
mongoose.connection.on('error', (err) => (
    console.error('MongoDB connection error: ${err}');
));

//Define API routes
app.use('/api', routes);

//Start Express.js server
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT} My BOI');
});

// Import Express server
const express = require('express');

const path = require('path');

// // Import Mongoose for MongoDB connectivity
// const mongoose = require('mongoose');

// Import the donenv module
const dotenv = require('dotenv');

// Configure the donenv module
dotenv.config();

// Create an express application
const app = express();

// Import the body-parser middleware
const bodyParser = require('body-parser');

// Define the port where the server will listen
const PORT = 3000;

// Use the middleware to parse URL-encoded data (from forms)
app.use(bodyParser.urlencoded({ extended: true })); 

// Middleware that logs every request details
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next(); // Call the next middleware or route handler
})

// Middleware that serves the static files from the 'public' directory
app.use(express.static('public')); 


// Route for the homepage (index.html will be served automatically)
app.get('/', (req, res) => {
    res.sendFilel(__dirname + '/public/index.html');
});

// Define another route (for about)
app.get('/about', (req, res) => {
    res.send('<h1>Welcome to Express</h1><p>This is the About page.</p>');
});

// Define a route that throws an error
app.get('/error', (req, res) => {
    throw new Error('Something went wrong');
});

// Error handling middleware (must be defined last)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console
    res.status(500).send('<h1>500 - Internal Server Error </h1>'); // Send a generic error page
});

// Middleware to handle 404 errors
// app.use((req, res) => {
//     res.status(404).send('<h1> 404 - Page Not Found <h1> The page you\'re looking for does not exsit')
// });

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
})

//Start Express Server and listen to the defined port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
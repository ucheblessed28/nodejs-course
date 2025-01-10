// Import Expree server
const express = require('express');

// Import Mongoose for MongoDB connectivity
const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

// Create an express application
const app = express();

// Define the port where the server will listen
const PORT = 3000;

// Define a simple route (Get request) for the home page
app.get('/', (req, res) => {
    res.send('<h1>Hello, world! Welcome to Express</h1>');
});

// Define another route (for about)
app.get('/about', (req, res) => {
    res.send('<h1>Welcome to Express</h1><p>This is the About page.</p>');
});

//Start Express Server and listen to the defined port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

mongoose.connect('mongodb+srv://admin:netisens2024@netisens.eyjgj.mongodb.net/?retryWrites=true&w=majority&appName=netisens') 
    .then(
        console.log(`Database Connected`)
    ) 

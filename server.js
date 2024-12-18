// Import the 'http' module
const http = require('http');

// Define the port where the server will listen
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
    // Set the response HTTP status code and content type
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    // Alternatively, you can set the status code and content type directly in the response object as shown below:
    // res.writeHead(200, { "Content-Type": "text/plain" }); .

    // Respoond with a message
    res.end('Hello, world! Welcome to NodeJS');
});

// Start the server and listen on port 3000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Note: The server will continue running until you manually stop it using Ctrl + C.


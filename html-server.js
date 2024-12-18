const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, "index.html");

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                // Handle file not found
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Not Found");
            } else {
                // Handle other errors
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
            }
            return;
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// // Import the required modules
// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const PORT = 3000

// // Create the server instance

// const server = http.createServer((req, res) => {
//     // Get the requested file path from the request URL
//     const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

//     // Read the file content
//     fs.readFile(filePath, 'utf8', (err, content) => {
//         if (err) {
//             // If file not found, send a 404 status code
//             res.writeHead(404, { 'Content-Type': 'text/html' });
//             res.end(`<h1>404 - Not Found</h1>`);
//             return;
//         }

//         // Send the file content as response
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(content);
//     });
// });

// // Start the server
// server.listen(PORT, (req, res) => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
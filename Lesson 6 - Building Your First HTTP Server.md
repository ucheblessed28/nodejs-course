
---

## **Lesson 6: Building Your First HTTP Server**

### **Overview**

Node.js has a built-in module called `http` that allows you to create and manage web servers. We'll use this module to create a simple server that responds to requests from a browser or any HTTP client.

---

### **Step 1: Create a Basic HTTP Server**

1. Create a file named `basic_server.js`.
2. Add the following code:
   ```javascript
   // Import the 'http' module
   const http = require("http");

   // Define the port where the server will listen
   const PORT = 3000;

   // Create the server
   const server = http.createServer((req, res) => {
       // Set the response header to indicate content type
       res.writeHead(200, { "Content-Type": "text/plain" });

       // Respond with a message
       res.end("Hello, World! Welcome to my Node.js server!");
   });

   // Start the server and listen on the specified port
   server.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

3. Run the server:
   ```bash
   node basic_server.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. You should see the message:
   ```
   Hello, World! Welcome to my Node.js server!
   ```

---

### **Explanation**

1. **`http.createServer()`**:
   - Creates an HTTP server.
   - The callback function `(req, res)` handles incoming requests and sends responses.

2. **`res.writeHead(200, { "Content-Type": "text/plain" })`**:
   - Sets the status code (`200 OK`) and the content type (`text/plain` for plain text).

3. **`res.end("Hello, World!")`**:
   - Sends the response and ends the HTTP request-response cycle.

4. **`server.listen(PORT, callback)`**:
   - Starts the server and listens for incoming connections on the specified port.

---

### **Step 2: Adding Routing to Your Server**

1. Update your `basic_server.js` to handle different routes:
   ```javascript
   const http = require("http");

   const PORT = 3000;

   const server = http.createServer((req, res) => {
       const url = req.url;

       if (url === "/") {
           res.writeHead(200, { "Content-Type": "text/plain" });
           res.end("Welcome to the Homepage!");
       } else if (url === "/about") {
           res.writeHead(200, { "Content-Type": "text/plain" });
           res.end("This is the About Page.");
       } else if (url === "/contact") {
           res.writeHead(200, { "Content-Type": "text/plain" });
           res.end("Contact us at contact@example.com");
       } else {
           res.writeHead(404, { "Content-Type": "text/plain" });
           res.end("404 Not Found");
       }
   });

   server.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

2. Restart the server and navigate to:
   - `http://localhost:3000/`
   - `http://localhost:3000/about`
   - `http://localhost:3000/contact`
   - `http://localhost:3000/some-random-path` (to see the 404 message).

---

### **Challenge for You**

1. Create a route `/services` that responds with:
   ```
   We offer Node.js development services.
   ```
2. Create a route `/blog` that responds with:
   ```
   Welcome to our blog section!
   ```
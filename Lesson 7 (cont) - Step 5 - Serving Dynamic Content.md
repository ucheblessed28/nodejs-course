
---

### **Step 5: Serving Dynamic Content**

In this step, we'll learn how to handle requests dynamically. Right now, we’re serving static files (e.g., HTML, CSS, JS), but web applications often need to respond to requests dynamically, for example by generating content on the fly or pulling data from a database.

We’ll walk through the process of creating **dynamic routes** and how to respond to specific requests.

---

### **Goals for this step**:
1. Handle dynamic routes (e.g., `/about`, `/contact`, etc.).
2. Serve dynamic content based on the request.
3. Set up a basic routing system to handle different URLs.

---

### **Updated Code**:
Here’s how we will modify the server to handle dynamic routes.

```javascript
// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the server port
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
    // Route handling
    if (req.url === '/') {
        // Serve the homepage (index.html)
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (req.url === '/about') {
        // Serve the About page dynamically
        const aboutContent = '<h1>About Us</h1><p>This is the About page, dynamically rendered!</p>';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(aboutContent);
    } else if (req.url === '/contact') {
        // Serve the Contact page dynamically
        const contactContent = '<h1>Contact Us</h1><p>This is the Contact page, dynamically rendered!</p>';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(contactContent);
    } else {
        // Handle 404 error if route is not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### **Explanation of the Code Changes**:

1. **Dynamic Routing**:
   - We are now checking the `req.url` to determine which route to respond to. This allows us to handle different URLs dynamically.
   - For example:
     - If the user accesses `/about`, the server sends a dynamically generated About page.
     - If the user accesses `/contact`, the server sends a Contact page.
     - If no matching route is found, it responds with a `404 - Page Not Found`.

2. **Serving HTML Dynamically**:
   - For the homepage (`/`), we read the `index.html` file using `fs.readFile()`, as before.
   - For other routes like `/about` and `/contact`, we dynamically generate HTML content inside the route handler.

3. **Handling 404 Errors**:
   - If the user visits an undefined route, we send a `404 Not Found` error.

---

### **Testing It**:
1. Start the server by running `node server.js` in your terminal.
2. Open your browser and navigate to:
   - `http://localhost:3000/` → Displays the homepage (index.html).
   - `http://localhost:3000/about` → Displays the dynamically generated About page.
   - `http://localhost:3000/contact` → Displays the dynamically generated Contact page.
   - `http://localhost:3000/any-other-url` → Displays a `404 - Page Not Found`.

---

### **Next Steps**:
This is a very basic approach to handling routes. In real-world applications, you would likely:
- Use frameworks like **Express.js** for easier route handling and middleware support.
- Render dynamic content based on user input, such as form submissions, or from data sources (like a database).
- Add templating engines to generate dynamic HTML content (e.g., **EJS** or **Pug**).

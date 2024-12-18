
---

## **Lesson 7: Serving HTML Content**

### **Objective**
We’ll create an HTTP server that serves **HTML files** instead of plain text. This allows you to build dynamic and user-friendly websites.

---

### **Step 1: Create an HTML File**

1. In the same directory as your Node.js script, create a new file named `index.html`.
2. Add the following content to `index.html`:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>My Node.js Server</title>
   </head>
   <body>
       <h1>Welcome to My Node.js Server!</h1>
       <p>This page is being served from a Node.js server.</p>
   </body>
   </html>
   ```

---

### **Step 2: Serve the HTML File Using Node.js**

1. Create a file named `serve_html.js`.
2. Add the following code:
   ```javascript
   // Import required modules
   const http = require("http");
   const fs = require("fs");
   const path = require("path");

   const PORT = 3000;

   // Create the server
   const server = http.createServer((req, res) => {
       const filePath = path.join(__dirname, "index.html");

       // Read the HTML file
       fs.readFile(filePath, (err, data) => {
           if (err) {
               res.writeHead(500, { "Content-Type": "text/plain" });
               res.end("Internal Server Error");
               console.error("Error reading file:", err);
               return;
           }

           // Serve the HTML file
           res.writeHead(200, { "Content-Type": "text/html" });
           res.end(data);
       });
   });

   // Start the server
   server.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

3. Run the server:
   ```bash
   node serve_html.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

You should see the content of `index.html` displayed in your browser.

---

### **Explanation**

1. **`fs.readFile(filePath, callback)`**:
   - Reads the content of the specified file asynchronously.
   - If the file is successfully read, the `data` parameter contains the file content.

2. **`res.writeHead(200, { "Content-Type": "text/html" })`**:
   - Sets the response header to indicate the content is HTML.

3. **Dynamic File Path (`path.join`)**:
   - Combines the current directory path with the file name to create a full path.

---

### **Step 3: Handling Non-Existent Files**

Update your code to handle cases where the HTML file might not exist:

```javascript
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
```

---

### **Challenge for You**
1. Create an additional HTML file named `about.html` with a simple "About Us" page.
2. Modify the server to serve:
   - `index.html` for `/`
   - `about.html` for `/about`
   - A `404 Not Found` message for any other routes.

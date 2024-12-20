
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

The code `if (err.code === "ENOENT")` is a way to check for a specific type of error that might occur when working with the filesystem using Node.js. Let’s break it down:

---

### **1. What is `err.code`?**
- When you use file system operations like `fs.readFile`, errors may occur (e.g., if the file doesn't exist or there are permission issues).
- If an error happens, the callback function is passed an `err` object.
- The `err.code` property provides a specific string identifying the type of error.

---

### **2. What does `"ENOENT"` mean?**
- `"ENOENT"` stands for **"Error NO ENTry"**.
- It indicates that the file or directory you are trying to access does not exist.
  - For example, if you attempt to read `nonexistent.html`, the error object will have `err.code` set to `"ENOENT"`.

---

### **3. Why Check for `"ENOENT"`?**
- When handling errors, you might want to perform specific actions based on the type of error.
- By checking `if (err.code === "ENOENT")`, you can specifically handle cases where the requested file is not found.

---

### **4. Example Usage in Context**

Here’s how it fits into a server:

```javascript
fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
        if (err.code === "ENOENT") {
            // Handle the "file not found" error
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
        } else {
            // Handle other types of errors
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>500 - Internal Server Error</h1>');
        }
        return;
    }

    // File was successfully read, send its content
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
});
```

#### Explanation:
1. **`if (err.code === "ENOENT")`:**
   - Specifically handles the case where the file doesn't exist.
   - Responds with a `404` status code and a "File Not Found" message.

2. **`else`:**
   - Handles other unexpected errors (e.g., permission denied or corrupted file).
   - Responds with a `500` status code and an "Internal Server Error" message.

---

### **5. Key Takeaway**
By checking `err.code`, you can implement precise error handling for different scenarios. The `"ENOENT"` code is one of the most common errors you’ll encounter when working with files, and handling it appropriately improves user experience and server reliability. 

---

### **Challenge for You**
1. Create an additional HTML file named `about.html` with a simple "About Us" page.
2. Modify the server to serve:
   - `index.html` for `/`
   - `about.html` for `/about`
   - A `404 Not Found` message for any other routes.




## **Step 4: Serving Static Files with Correct Content-Type**

We’re going to enhance the server to serve not just HTML files, but also other static files such as CSS, JavaScript, and images, with the correct content type.

### **Goal**: 
- Serve different file types like `.html`, `.css`, `.js`, `.jpg`, etc., and set the correct `Content-Type` headers for each.

### **Updated Code:**
```javascript
// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the server port
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
    // Determine the requested file path
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Get the file extension to determine content type
    const extname = path.extname(filePath);

    // Map file extensions to content types
    const contentTypeMap = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.txt': 'text/plain',
    };

    // Default to 'text/html' if file type is unknown
    const contentType = contentTypeMap[extname] || 'application/octet-stream';

    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, serve 404 page
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>');
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
            }
            return;
        }

        // Serve the file with the correct content type
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### **Explanation of Changes**

#### 1. **Extracting File Extension**
   - **Code**:
     ```javascript
     const extname = path.extname(filePath);
     ```
   - **Purpose**:  
     This retrieves the extension of the requested file. For example, if the URL is `/style.css`, this will extract `.css`.

#### 2. **Mapping File Extensions to Content Types**
   - **Code**:
     ```javascript
     const contentTypeMap = {
         '.html': 'text/html',
         '.css': 'text/css',
         '.js': 'application/javascript',
         '.png': 'image/png',
         '.jpg': 'image/jpeg',
         '.gif': 'image/gif',
         '.svg': 'image/svg+xml',
         '.json': 'application/json',
         '.txt': 'text/plain',
     };
     ```
   - **Purpose**:  
     This map tells the server what content type to use for each file extension. For example:
     - `.html` → `text/html`
     - `.css` → `text/css`
     - `.png` → `image/png`
     - `.jpg` → `image/jpeg`

#### 3. **Default to `application/octet-stream`**
   - **Code**:
     ```javascript
     const contentType = contentTypeMap[extname] || 'application/octet-stream';
     ```
   - **Purpose**:  
     If the file extension is not found in the `contentTypeMap`, the server defaults to `application/octet-stream`, which is a binary stream type. This ensures files that are not recognized still get served correctly.

#### 4. **Serving the File with the Correct Content-Type**
   - **Code**:
     ```javascript
     res.writeHead(200, { 'Content-Type': contentType });
     res.end(content);
     ```
   - **Purpose**:  
     The server sends a `200 OK` status code with the correct `Content-Type` based on the file extension. It then serves the content of the requested file.

---

### **Testing It**
1. **Create Sample Files**:
   - Create a sample HTML file (`index.html`):
     ```html
     <html>
     <head>
         <title>Test Page</title>
         <link rel="stylesheet" href="style.css">
     </head>
     <body>
         <h1>Hello World</h1>
         <script src="script.js"></script>
     </body>
     </html>
     ```
   - Create a sample CSS file (`style.css`):
     ```css
     body {
         font-family: Arial, sans-serif;
         background-color: #f0f0f0;
         text-align: center;
     }
     ```
   - Create a sample JavaScript file (`script.js`):
     ```javascript
     console.log("JavaScript loaded!");
     ```

2. **Start the Server**:
   - Save the code above and run it by typing `node server.js` in your terminal.

3. **Test the Pages**:
   - Open a browser and navigate to:
     - `http://localhost:3000/` → The HTML page with styles and scripts.
     - `http://localhost:3000/style.css` → The CSS file.
     - `http://localhost:3000/script.js` → The JavaScript file.

---

### **What’s Next**
This sets up a simple static file server. In future steps, we can:
1. Add route handling for dynamic content.
2. Introduce templating engines for rendering dynamic HTML.
3. Serve more advanced resources like APIs or databases.

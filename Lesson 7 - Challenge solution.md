# **Lesson 7 Challenge Solution: To serve for other routes.**


## **Steps:**

1. **Create `index.html`**:  
   Add a basic home page in the project directory.

   ```html
   <!-- index.html -->
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Home</title>
   </head>
   <body>
       <h1>Welcome to the Home Page</h1>
       <p>This is the main landing page of the website.</p>
   </body>
   </html>
   ```

2. **Create `about.html`**:  
   Add a simple About Us page in the project directory.

   ```html
   <!-- about.html -->
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>About Us</title>
   </head>
   <body>
       <h1>About Us</h1>
       <p>This is the about page of the website.</p>
   </body>
   </html>
   ```

3. **Modify the Server Code**:  
   Update the server logic to handle `/`, `/about`, and other routes.

---

### **Final Server Code**

```javascript
// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the server port
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
    let filePath;

    // Determine the requested route
    if (req.url === '/') {
        filePath = path.join(__dirname, 'index.html'); // Serve home page
    } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'about.html'); // Serve about page
    } else {
        filePath = null; // Route not found
    }

    // Handle file serving or 404 error
    if (filePath) {
        // Read and serve the requested file
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else {
        // Send a 404 Not Found response for invalid routes
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

### **Explanation of Changes**

1. **Routing Logic**:
   - `if (req.url === '/')`: Serves the `index.html` file for the root route.
   - `else if (req.url === '/about')`: Serves the `about.html` file for the `/about` route.
   - `else`: Handles any other routes with a `404 Not Found` message.

2. **Error Handling**:
   - If a file cannot be read due to some server-side issue, the server sends a `500 - Internal Server Error`.

3. **File Serving**:
   - The `fs.readFile` function reads the appropriate file and sends its content with a `200 OK` status.

---

### **How to Test**

1. Run the server using:
   ```bash
   node server.js
   ```

2. Visit the following URLs in your browser:
   - `http://localhost:3000/` → Displays the Home Page.
   - `http://localhost:3000/about` → Displays the About Us Page.
   - Any other route (e.g., `http://localhost:3000/unknown`) → Displays a `404 - Page Not Found` message.

---

## **Error Handling Breakdown**


### **Section 1: Handling the File Path (`if (filePath)`)**
- **Purpose**:  
  This part checks if the `filePath` is valid (i.e., if a file was determined to match the requested route, such as `/` or `/about`).

- **Code**:
  ```javascript
  if (filePath) {
  ```

- **Explanation**:  
  - If a valid `filePath` exists, it means a route like `/` or `/about` matched, and we proceed to serve the corresponding file.

---

### **Section 2: Reading and Serving the File**
- **Purpose**:  
  To read the file at `filePath` and serve its content as the response.

- **Code**:
  ```javascript
  fs.readFile(filePath, 'utf8', (err, content) => {
  ```

- **Explanation**:
  - **`fs.readFile(filePath, 'utf8', ...)`**: Reads the content of the file located at `filePath`.  
    - `filePath`: Path to the file to be read (e.g., `index.html` or `about.html`).
    - `'utf8'`: Ensures the file is read as a UTF-8 string (instead of raw bytes).
    - `(err, content)`: Callback function receives:
      - `err`: Error object, if an issue occurs while reading the file.
      - `content`: The actual content of the file.

---

### **Section 3: Handling Errors**
- **Purpose**:  
  If an error occurs while reading the file, send a `500 Internal Server Error` response.

- **Code**:
  ```javascript
  if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Internal Server Error</h1>');
      return;
  }
  ```

- **Explanation**:
  - **`if (err)`**: Checks if an error occurred during file reading.
  - **`res.writeHead(500, { 'Content-Type': 'text/html' });`**: Sends a `500` status code with a header indicating the content type is HTML.
  - **`res.end('<h1>500 - Internal Server Error</h1>');`**: Ends the response with an error message for the user.
  - **`return`**: Ensures no further processing occurs if there’s an error.

---

### **Section 4: Sending the File Content**
- **Purpose**:  
  If no error occurs, send the file content as the HTTP response.

- **Code**:
  ```javascript
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(content);
  ```

- **Explanation**:
  - **`res.writeHead(200, { 'Content-Type': 'text/html' });`**: Sends a `200 OK` status code and sets the content type as HTML.
  - **`res.end(content);`**: Ends the response by sending the actual content of the file to the user’s browser.

---

### **Section 5: Handling Invalid Routes**
- **Purpose**:  
  If `filePath` is `null`, it means the route does not match `/` or `/about`. A `404 Not Found` response is sent.

- **Code**:
  ```javascript
  } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>');
  }
  ```

- **Explanation**:
  - **`else`**: Handles cases where `filePath` is `null`.
  - **`res.writeHead(404, { 'Content-Type': 'text/html' });`**: Sends a `404 Not Found` status code with an HTML content type.
  - **`res.end('<h1>404 - Page Not Found</h1>');`**: Ends the response with a 404 error message for the user.

---

### **Flow Summary**
1. **File Exists (`if filePath`)**:
   - Try to read and serve the file.
   - Handle file reading errors with a `500 Internal Server Error`.

2. **Invalid Route (`else`)**:
   - Send a `404 Not Found` response.

This section ensures that valid routes serve appropriate files, while invalid ones provide clear feedback to the user.

# **HTML Server Code Breakdown**



### **1. Import Required Modules**

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');
```

#### Explanation:
- **`http`**: Built-in Node.js module for creating HTTP servers.
- **`fs`**: File system module for interacting with the file system (e.g., reading files).
- **`path`**: Module for handling file and directory paths, ensuring compatibility across operating systems.

---

### **2. Define the Port**

```javascript
const PORT = 3000;
```

#### Explanation:
- Sets the port number for the server to listen on.
- When the server starts, it will be accessible via `http://localhost:3000`.

---

### **3. Create the Server**

```javascript
const server = http.createServer((req, res) => {
    // Server logic goes here
});
```

#### Explanation:
- **`http.createServer`**: Creates an HTTP server instance.
- The server listens for incoming requests and responds based on the logic inside the callback function `(req, res)`.
  - **`req`**: Represents the incoming request object (e.g., URL, headers).
  - **`res`**: Represents the response object used to send data back to the client.

---

### **4. Determine the Requested File Path**

```javascript
const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
```

#### Explanation:
- **`__dirname`**: The current directory of the script.
- **`req.url`**: The URL path requested by the client (e.g., `/`, `/about.html`).
  - If the client requests `/` (the root), serve `index.html`.
  - Otherwise, serve the file matching the request URL (e.g., `/about.html`).
- **`path.join`**: Combines the directory path and file name to create the full file path (e.g., `/path/to/index.html`).

---

### **5. Read the File Content**

```javascript
fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
        // Error handling code
    }

    // Success response code
});
```

#### Explanation:
- **`fs.readFile`**: Reads the content of the specified file.
  - **`filePath`**: The path to the file.
  - **`'utf8'`**: Encoding format to read the file as text.
  - **Callback function `(err, content)`**:
    - **`err`**: If an error occurs (e.g., file not found), it contains error details.
    - **`content`**: The file content if successfully read.

---

### **6. Handle Errors (File Not Found)**

```javascript
if (err) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`<h1>404 - Not Found</h1>`);
    return;
}
```

#### Explanation:
- If the file cannot be found or read:
  - Send a `404` status code.
  - Write a response with the content type `text/html`.
  - Return an HTML message: `<h1>404 - Not Found</h1>`.
- **`return`**: Ensures no further code runs after handling the error.

---

### **7. Send the File Content**

```javascript
res.writeHead(200, { 'Content-Type': 'text/html' });
res.end(content);
```

#### Explanation:
- **`res.writeHead(200)`**:
  - Sends a `200 OK` status code indicating the request was successful.
  - Sets the response header, specifying the content type as HTML (`text/html`).
- **`res.end(content)`**:
  - Ends the response and sends the file content to the client.

---

### **8. Start the Server**

```javascript
server.listen(PORT, (req, res) => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

#### Explanation:
- **`server.listen`**:
  - Starts the server and makes it listen for requests on the specified port (`3000`).
  - The callback logs a message to the console when the server is running.

---

### **What Happens When a Request is Made**

1. A request is sent to the server (e.g., `http://localhost:3000/` or `http://localhost:3000/about.html`).
2. The server determines the file to serve based on `req.url`.
   - For `/`, it serves `index.html`.
   - For other paths, it serves the corresponding file.
3. The server reads the requested file using `fs.readFile`.
4. If the file is found:
   - The server sends a `200 OK` response and the file content.
5. If the file is not found:
   - The server sends a `404 Not Found` response.

---

### **Key Takeaways**
1. This code allows serving specific HTML files based on the requested URL.
2. It gracefully handles errors (e.g., file not found).
3. You can extend this code to support additional routes or file types (e.g., CSS, images).

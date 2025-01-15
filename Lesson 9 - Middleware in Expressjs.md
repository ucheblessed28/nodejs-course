### **Lesson 9: Middleware in Express.js**

Middleware functions are one of the most powerful and flexible features of Express.js. They allow you to execute code, modify the request/response objects, and control the application's request-response lifecycle.

---

### **What is Middleware?**

Middleware functions are functions that:
1. Execute during the request-response cycle.
2. Have access to the request (`req`), response (`res`), and the `next` middleware function in the application’s stack.
3. Either terminate the request-response cycle or pass control to the next middleware using `next()`.

---

### **Types of Middleware in Express.js**

1. **Application-Level Middleware**: Defined at the application level using `app.use()` or specific HTTP methods (`app.get()`, `app.post()`, etc.).
2. **Router-Level Middleware**: Middleware that applies to specific routes or groups of routes.
3. **Error-Handling Middleware**: Specifically for handling errors.
4. **Built-in Middleware**: Middleware included in Express.js like `express.json()` and `express.static()`.
5. **Third-Party Middleware**: Middleware provided by external libraries like `cors`, `morgan`, etc.

---

### **Example: Application-Level Middleware**

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to log request details
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next(); // Pass control to the next middleware
});

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Us Page');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### **Explanation**

1. `app.use()`:
   - This middleware runs for every request made to the application.
   - In the above example, it logs the HTTP method and URL of the incoming request.

2. `next()`:
   - Ensures the next middleware function in the stack gets executed.
   - If `next()` is not called, the request-response cycle will be stuck.

---

### **Example: Router-Level Middleware**

```javascript
const express = require('express');
const app = express();
const router = express.Router();
const PORT = 3000;

// Middleware specific to this router
router.use((req, res, next) => {
    console.log('Router-Level Middleware Triggered');
    next();
});

// Define routes in the router
router.get('/profile', (req, res) => {
    res.send('User Profile');
});

router.get('/settings', (req, res) => {
    res.send('User Settings');
});

// Use the router in the app
app.use('/user', router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### **Built-in Middleware**

#### **Example: `express.json()` and `express.urlencoded()`**
- These middleware functions parse incoming JSON or URL-encoded payloads.

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/data', (req, res) => {
    console.log(req.body); // Access parsed body
    res.send('Data received');
});
```

---

### **Error-Handling Middleware**

Error-handling middleware has four arguments: `(err, req, res, next)`.

#### **Example: Basic Error Handling**
```javascript
app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error); // Pass the error to the error-handling middleware
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            message: err.message,
        },
    });
});
```

---

### **Third-Party Middleware**

#### **Example: Using `morgan` for Logging**
1. Install `morgan`:
   ```bash
   npm install morgan
   ```

2. Use it in the app:
   ```javascript
   const morgan = require('morgan');

   // Use morgan middleware
   app.use(morgan('dev'));

   app.get('/', (req, res) => {
       res.send('Home Page');
   });
   ```

---

### **1. Morgan**
Morgan is a third-party middleware used to log HTTP requests in your Node.js application. It’s especially useful for debugging and monitoring the requests coming into your server.

#### **Key Features**
- Logs incoming requests (method, URL, response time, etc.)
- Helps you debug and understand the traffic pattern of your app.
- Can be customized to log in various formats.

#### **Installation**
To use Morgan, install it using npm:
```bash
npm install morgan
```

#### **Usage**
Here’s how to integrate Morgan in your Express app:

```javascript
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// Use morgan middleware
app.use(morgan('dev'));

// Example route
app.get('/', (req, res) => {
    res.send('Hello, Morgan!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

#### **Morgan Logging Formats**
Morgan provides several built-in formats for logging:
- **`dev`**: Concise colored output for development (method, URL, status, response time, etc.).
- **`common`**: Logs in the Apache Common Log format (standard log format for web servers).
- **`combined`**: Includes detailed information like user-agent, referrer, and more (useful for production).
- **`short`**: Minimal output with essential details.

Example with `combined` format:
```javascript
app.use(morgan('combined'));
```

#### **Custom Logging**
You can customize Morgan to log specific details:
```javascript
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
}));
```

---

### **2. CORS**
CORS (Cross-Origin Resource Sharing) is a security feature that controls how resources on your server are shared across different origins. For instance, if your frontend is hosted on `http://example.com` and the backend on `http://api.example.com`, CORS must be configured to allow communication between these origins.

#### **Why Use CORS?**
- By default, browsers block requests made to a different origin due to security reasons.
- CORS allows you to specify which domains, HTTP methods, and headers are permitted.

#### **Installation**
Install the `cors` package via npm:
```bash
npm install cors
```

#### **Usage**
Here’s a basic setup:
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Use cors middleware
app.use(cors());

// Example route
app.get('/data', (req, res) => {
    res.json({ message: 'CORS is enabled!' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

#### **Advanced Configuration**
You can customize CORS to allow specific origins, methods, and headers:
```javascript
app.use(cors({
    origin: 'http://example.com', // Allow only this origin
    methods: ['GET', 'POST'],    // Allow only GET and POST requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));
```

#### **Dynamic Origin**
If you want to allow multiple origins dynamically:
```javascript
const allowedOrigins = ['http://example.com', 'http://another.com'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
```

#### **Error Handling**
If a request doesn’t match the CORS policy, it will be blocked by the browser. You can handle errors like this:
```javascript
app.use((err, req, res, next) => {
    if (err.name === 'CorsError') {
        res.status(401).send('CORS Error: Not allowed');
    } else {
        next(err);
    }
});
```

---

### **When to Use Morgan and CORS Together?**
- **Morgan** is great for development to log every request and response.
- **CORS** is crucial for APIs accessed by different origins, especially in production environments.

---

### **Key Points**
- Middleware functions are executed in the order they are defined.
- Always include `next()` unless terminating the request-response cycle.
- Middleware can be global (applied to all routes) or specific to certain routes.

---
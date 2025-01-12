# **Lesson 8: Using Express.js for Web Development**

While building a server using the native `http` module in Node.js gives us full control over the request/response cycle, it can be cumbersome for larger applications. This is where **Express.js** comes in.

**Express.js** is a popular web framework for Node.js that simplifies handling HTTP requests, routing, middleware, and more. It provides a higher-level abstraction for creating web applications, making it easier and faster to develop.

---

### **Key Concepts We'll Cover:**

1. **Setting Up Express**: Installing and setting up Express.
2. **Basic Routing with Express**: Handling different routes with Express.
3. **Serving Static Files**: How to serve static files (like images, CSS, JavaScript) using Express.
4. **Using Middleware**: Using built-in and custom middleware functions.
5. **Handling GET and POST Requests**: How to handle different HTTP methods with Express.
6. **Template Engines**: Rendering dynamic HTML using template engines in Express.
7. **Error Handling**: How to handle errors in Express.

---

### **1. Setting Up Express**

To get started, you need to install **Express** using **npm** (Node Package Manager). If you haven’t done it yet, let's first initialize a new Node.js project and install Express.

#### **Step 1: Install Express**

Open your terminal and run the following commands:

```bash
# Initialize a new Node.js project (if you haven't done it already)
npm init -y

# Install Express.js
npm install express
```

---

### **2. Basic Routing with Express**

Once Express is installed, we can use it to create a simple web server.

#### **Example: Creating a Simple Server with Express**

Create a file called `app.js` and add the following code:

```javascript
// Import the express module
const express = require('express');

// Create an express application
const app = express();

// Define the port where the server will listen
const PORT = 3000;

// Define a simple route (GET request) for the homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Express!</h1>');
});

// Define another route for /about
app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1><p>This is a basic Express application.</p>');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

#### **Explanation**:
- `express()` creates an Express app instance.
- `app.get()` defines a route for handling GET requests. The first argument is the URL path, and the second is a callback function that takes the request (`req`) and response (`res`) objects.
- `app.listen()` starts the server, listening on the specified port (`3000` in this case).

Run the app with the following command in the terminal:

```bash
node app.js
```

Now, open your browser and go to `http://localhost:3000`. You should see the message "Welcome to Express!" If you visit `http://localhost:3000/about`, you should see "About Us" displayed.

---

### **3. Serving Static Files**

Express makes it easy to serve static files like images, CSS, and JavaScript. For example, if you have a `public` directory with assets, you can serve those files using the `express.static()` middleware.

#### **Example: Serving Static Files**

Let’s assume you have a directory structure like this:

```
/app.js
/public
  /index.html
  /styles.css
  /image.jpg
```

Now, you can serve those static files by using the following code in `app.js`:

```javascript
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the homepage (index.html will be served automatically)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
```

#### **Explanation**:
- `express.static('public')` is middleware that serves static files from the `public` directory.
- We specify `__dirname + '/public/index.html'` to serve the `index.html` file from the `public` directory when the user accesses the homepage.

With this setup, if you have any CSS or JavaScript files referenced in `index.html`, they will be served automatically by Express.

---

### **4. Using Middleware**

Middleware functions in Express are used to modify the request or response objects, add custom logic, or handle errors.

#### **Example: Logging Middleware**

Let's add some middleware that logs every incoming request.

```javascript
// Middleware to log request details
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next(); // Call the next middleware or route handler
});

// Define a route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Express!</h1>');
});
```

#### **Explanation**:
- `app.use()` is used to define middleware that runs for every request.
- The middleware function has access to the `req`, `res`, and `next` objects. It logs the method and URL of the incoming request and then calls `next()` to pass control to the next middleware or route handler.

---

### **5. Handling GET and POST Requests**

Express makes it easy to handle different HTTP methods. You can use `app.get()`, `app.post()`, `app.put()`, and `app.delete()` to define routes for different HTTP methods.

#### **Example: Handling GET and POST**

```javascript
// Handling a GET request
app.get('/submit', (req, res) => {
    res.send('<h1>Submit Your Form</h1><form method="POST" action="/submit"><input type="text" name="name" /><button type="submit">Submit</button></form>');
});

// Handling a POST request
app.post('/submit', (req, res) => {
    let name = req.body.name;  // Extract the "name" field from the form
    res.send(`<h1>Thank You, ${name}!</h1>`);
});
```

For the POST route to work, we need to parse the body of the request, which is typically done with middleware.

#### **To Parse Form Data**:
Install the `express.urlencoded` middleware:

```bash
npm install body-parser
```

Then, modify `app.js` to use it:

```javascript
const bodyParser = require('body-parser');

// Use middleware to parse URL-encoded data (from forms)
app.use(bodyParser.urlencoded({ extended: true }));
```

---

### **6. Template Engines**

Express also supports rendering dynamic views with template engines like **EJS** or **Pug**. These engines allow you to embed JavaScript code inside HTML templates.

For now, let’s keep it simple and focus on handling dynamic content in the HTML files by passing data from the server.

---

### **7. Error Handling in Express**

Express provides a built-in mechanism for handling errors using middleware.

#### **Example: Error Handling Middleware**

```javascript
// Define a route that throws an error
app.get('/error', (req, res) => {
    throw new Error('Something went wrong!');
});

// Error-handling middleware (must be defined last)
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack to the console
    res.status(500).send('<h1>500 - Internal Server Error</h1>');  // Send a generic error page
});
```

#### **Explanation**:
- When an error is thrown, Express will pass it to the error-handling middleware (`app.use()`).
- This middleware logs the error and sends a `500` status code with a generic error message.

---

Setting up a **404 Error Page** for requests to routes that do not exist is an essential part of error handling in any web application. In Express.js, this can be done using a middleware function that catches all unmatched routes.

---

### **How to Set Up a 404 Error Page**

1. **Define the 404 Middleware**:
   - The middleware function should be placed after all other route handlers.
   - This function will catch any requests that don't match a defined route.

2. **Send a Custom 404 Response**:
   - You can send a custom HTML message or render a 404 page using a template engine or static file.

---

### **Example: Adding a 404 Error Page**

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Define routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Home Page</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1>');
});

// Middleware to handle 404 errors
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### **Explanation**:

1. **Order of Middleware**:
   - The `app.use()` function that handles 404 errors is placed **after all routes**. This ensures that it only runs if no routes match the request.

2. **Setting the Status Code**:
   - `res.status(404)` sets the HTTP response status to 404, indicating that the requested resource was not found.

3. **Sending a Custom Message**:
   - `res.send()` sends an HTML response. You can customize this to include links back to the homepage or other helpful information.

---

### **Enhancing the 404 Page**

You can serve a static HTML file as the 404 page or render a dynamic view using a template engine like EJS, Pug, or Handlebars.

#### **Example: Using a Static HTML File**

Create a `404.html` file in a `public` folder with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { font-size: 2.5em; color: #FF0000; }
        p { font-size: 1.2em; }
    </style>
</head>
<body>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/">Go Back to Home</a>
</body>
</html>
```

Update your Express app to serve the file:

```javascript
const path = require('path');

// Middleware to handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
```

---

### **Example: Using a Template Engine**

If you're using a template engine (like EJS), you can create a dynamic 404 page.

1. Install EJS:
   ```bash
   npm install ejs
   ```

2. Set up EJS in your app:
   ```javascript
   app.set('view engine', 'ejs');
   ```

3. Create a `views/404.ejs` file:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>404 - Page Not Found</title>
   </head>
   <body>
       <h1>404 - Page Not Found</h1>
       <p>Oops! The page you requested, <strong><%= url %></strong>, does not exist.</p>
       <a href="/">Go Back to Home</a>
   </body>
   </html>
   ```

4. Update the 404 middleware to render the EJS view:
   ```javascript
   app.use((req, res) => {
       res.status(404).render('404', { url: req.url });
   });
   ```

---

### **Testing the 404 Error Page**

Start your server and try accessing a route that doesn't exist, e.g., `http://localhost:3000/nonexistent`. You should see your custom 404 error page.


### **Next Steps:**
We’ve covered the basics of **Express.js**:
- Setting up a basic Express server.
- Handling routes and serving static files.
- Using middleware and handling different HTTP methods.
- Basic error handling.
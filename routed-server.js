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
    } else if (url === "/services") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("We offer Node.js development services.");
    } else if (url === "/blog") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to our blog section!");
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Importing the 'fs' module
const fs = require('fs');

// Reading file manually
fs.readFile('note.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading note.txt:', err);
        return;
    }
    console.log('File Content:', data);
});
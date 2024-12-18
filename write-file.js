// Importing the 'fs' module
const fs = require('fs');

// Creating the file 
const content = 'Welcome to Node JS';

fs.writeFile('note.txt', content, (err) => {
    if (err) {
        console.error('Error writing note.txt:', err);
        return;
    }
    console.log('Writing note.txt successfully');
});
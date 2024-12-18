// Importing the 'fs' module
const fs = require('fs');

// Additional content
const additionalContent = '\nI love backend engineering, it is the pathway to DevOps';

// Adding additional content
fs.appendFile('note.txt', additionalContent, (err) => {
    if (err) {
        console.error('Error writing note.txt:', err);
        return;
    }
    console.log('Note.txt written successfully');
});
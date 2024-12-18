// Importing the file system 'fs' module
const fs = require('fs');

// Deleting the fie manually
fs.unlink('note.txt', (err) => {
    if (err) {
        console.error('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully');
})
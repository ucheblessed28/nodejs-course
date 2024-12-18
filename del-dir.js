// importing the 'fs' module
const fs = require('fs');

const dirName = 'my_dir'

// Deleting the directory
fs.rmdir(dirName, (err) => {
    if (err) {
        console.error('Error deleting directory:', err);
        return;
    }
    console.log('Deleting directory:', dirName);
});
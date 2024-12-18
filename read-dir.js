// Importing the 'fs' module
const fs = require('fs');

const dirName = 'my_dir';

// Reading the contents of the directory
fs.readdir(dirName, (err, files) => {
    if (err) {
        console.error('Error reading file in directory;', err);
        return;
    }
    console.log(`Reading file in ${dirName}:`, files);
});
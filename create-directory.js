// importing the 'fs' module
const fs = require('fs');

const dirName = 'my_dir';

// Creating the directory
fs.mkdir(dirName, (err) => {
    if (err) {
        console.error('Error creating directory:', err);
        return;
    }
    console.log('Created directory:', dirName)
});
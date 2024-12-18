// Importing the 'fs' module
const fs = require('fs');

const path = require('path');

const dirName = 'my_dir';
const fileName = 'info.txt';
const filePath = path.join(dirName, fileName);

const content = 'This is info.txt'

// Step 1: Create the directory
fs.mkdir(dirName, { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating directory:', err);
        return;
    }
    console.log('Created directory successfully:', dirName);

    // Step 2: Create the file
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            return;
        }
        console.log(`Created file ${fileName} successfully in ${dirName}`);
    })
});
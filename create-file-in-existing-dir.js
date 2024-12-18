// Importing the 'fs' module
const fs = require("fs");
const path = require("path");

const dirName = "my_dir"; // Assume this directory already exists
const fileName = "existing_info.txt";
const filePath = path.join(dirName, fileName);

const content = "This is a new file written to the existing directory.";

// Step 1: Check if the directory exists
fs.access(dirName, fs.constants.F_OK, (err) => {
    if (err) {
        console.error(`Directory '${dirName}' does not exist.`);
        return;
    }

    console.log(`Directory '${dirName}' exists.`);

    // Step 2: Write a file to the existing directory
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        console.log(`File '${fileName}' written successfully in '${dirName}'!`);
    });
});

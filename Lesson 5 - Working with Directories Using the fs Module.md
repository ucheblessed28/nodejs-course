
---

## **Lesson 5: Working with Directories Using the `fs` Module**

### **Creating, Reading, and Deleting Directories**

#### **1. Creating a Directory**

1. Create a file named `create_directory_example.js` and add the following code:
   ```javascript
   // Importing the 'fs' module
   const fs = require("fs");

   const dirName = "my_directory";

   // Creating a directory asynchronously
   fs.mkdir(dirName, (err) => {
       if (err) {
           console.error("Error creating directory:", err);
           return;
       }
       console.log(`Directory '${dirName}' created successfully!`);
   });
   ```

2. Run the script:
   ```bash
   node create_directory_example.js
   ```

3. Check your project folder for a new directory named `my_directory`.

   **Explanation**:
   - `fs.mkdir()`: Creates a new directory. It takes the directory name as the first argument.

---

#### **2. Reading the Contents of a Directory**

1. Create a file named `read_directory_example.js` and add the following code:
   ```javascript
   // Importing the 'fs' module
   const fs = require("fs");

   const dirName = "my_directory";

   // Reading the contents of a directory
   fs.readdir(dirName, (err, files) => {
       if (err) {
           console.error("Error reading directory:", err);
           return;
       }
       console.log(`Contents of '${dirName}':`, files);
   });
   ```

2. Run the script:
   ```bash
   node read_directory_example.js
   ```

   **Explanation**:
   - `fs.readdir()`: Reads the contents of a directory and returns an array of file and folder names.

---

#### **3. Deleting a Directory**

1. Create a file named `delete_directory_example.js` and add the following code:
   ```javascript
   // Importing the 'fs' module
   const fs = require("fs");

   const dirName = "my_directory";

   // Deleting a directory asynchronously
   fs.rmdir(dirName, (err) => {
       if (err) {
           console.error("Error deleting directory:", err);
           return;
       }
       console.log(`Directory '${dirName}' deleted successfully!`);
   });
   ```

2. Run the script:
   ```bash
   node delete_directory_example.js
   ```

   **Explanation**:
   - `fs.rmdir()`: Deletes a directory. The directory must be empty for this method to work.

---

### **Challenge for You**
1. Create a directory named `projects`.
2. Inside the `projects` directory, create a file named `project.txt` with some content.
3. Read the contents of the `projects` directory and print it to the console.
4. Finally, delete both the file and the directory.


---

## **Creating a File in a Specific Directory**

We can use the **`fs.writeFile`** method to create a file in a specific directory. Let’s add this step to the process.

---

### **Code Example: Create a File in the New Directory**

1. Create a file named `create_file_in_directory.js` and add the following code:
   ```javascript
   // Importing the 'fs' module
   const fs = require("fs");
   const path = require("path");

   const dirName = "my_directory";
   const fileName = "info.txt";
   const filePath = path.join(dirName, fileName);

   const content = "This is a file inside the directory.";

   // Step 1: Create the directory
   fs.mkdir(dirName, { recursive: true }, (err) => {
       if (err) {
           console.error("Error creating directory:", err);
           return;
       }
       console.log(`Directory '${dirName}' created successfully!`);

       // Step 2: Create a file inside the directory
       fs.writeFile(filePath, content, (err) => {
           if (err) {
               console.error("Error writing file:", err);
               return;
           }
           console.log(`File '${fileName}' created successfully in '${dirName}'!`);
       });
   });
   ```

2. Run the script:
   ```bash
   node create_file_in_directory.js
   ```

3. Check the `my_directory` folder for the file `info.txt` containing the text:
   ```
   This is a file inside the directory.
   ```

---

### **Explanation**

1. **`path.join(dirName, fileName)`**:
   - Combines the directory name and file name into a full path.
   - Ensures the code works on all operating systems, as `path` handles slashes appropriately.

2. **`fs.mkdir(dirName, { recursive: true })`**:
   - The `recursive: true` option ensures the directory is created even if its parent directories are missing.

3. **`fs.writeFile(filePath, content)`**:
   - Creates the file with the specified content inside the provided directory.

---

### **Challenge for You**
1. Create a directory named `logs`.
2. Inside the `logs` directory, create a file named `log.txt` and write:
   ```
   Log Entry: Node.js File System Example
   ```
3. Read the content of `log.txt` and print it to the console.
4. Append the line:
   ```
   Log Entry Complete.
   ```
   to `log.txt`.

---

### **Writing a File to an Existing Directory**

Here’s how you can write a file to a directory that already exists:

1. Create a file named `write_file_in_existing_directory.js` and add the following code:
   ```javascript
   // Importing the 'fs' module
   const fs = require("fs");
   const path = require("path");

   const dirName = "my_directory"; // Assume this directory already exists
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
   ```

2. Run the script:
   ```bash
   node write_file_in_existing_directory.js
   ```

3. Check the `my_directory` folder for the file `existing_info.txt` containing the text:
   ```
   This is a new file written to the existing directory.
   ```

---

### **Explanation**

1. **`fs.access(dirName, fs.constants.F_OK)`**:
   - Checks if the directory exists.
   - If the directory does not exist, an error is thrown, and we log a message saying so.

2. **`fs.writeFile(filePath, content)`**:
   - Writes the specified content to the file in the existing directory.
   - If the file already exists, it will overwrite the content. To append instead, use `fs.appendFile()`.

---

### **Challenge for You**
1. Create a directory named `data` manually.
2. Write a file named `records.txt` in the `data` directory with the content:
   ```
   Initial Record: Node.js Practice.
   ```
3. Check the directory for the file and confirm the content.

---
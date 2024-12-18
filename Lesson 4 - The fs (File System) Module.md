
---

## **Lesson 4: The `fs` (File System) Module**

### **What is the `fs` Module?**
The `fs` module provides a way to interact with the file system, allowing you to:
- Read files.
- Write to files.
- Append data to files.
- Delete files and directories.
- Work with directories.

---

### **Basic File Operations**
Let’s explore some of the most common tasks.

#### **1. Reading a File**

1. Create a file named `read_file_example.js` with the following code:
   ```javascript
   // Importing the 'fs' module
   const fs = require("fs");

   // Reading a file asynchronously
   fs.readFile("example.txt", "utf8", (err, data) => {
       if (err) {
           console.error("Error reading the file:", err);
           return;
       }
       console.log("File content:", data);
   });
   ```

2. Create a file named `example.txt` in the same directory and add some content to it:
   ```
   Hello, this is a sample text file!
   ```

3. Run the script:
   ```bash
   node read_file_example.js
   ```

   **Explanation**:
   - `fs.readFile()`: Asynchronously reads the content of a file.
   - The first argument is the file path.
   - The second argument, `"utf8"`, specifies the encoding.
   - The callback function handles the result or error.

---

#### **2. Writing to a File**

1. Create a file named `write_file_example.js` with the following code:
   ```javascript
   // Importing the 'fs' module
   const fs = require("fs");

   const content = "This is some new content for the file.";

   // Writing to a file asynchronously
   fs.writeFile("output.txt", content, (err) => {
       if (err) {
           console.error("Error writing to the file:", err);
           return;
       }
       console.log("File written successfully!");
   });
   ```

2. Run the script:
   ```bash
   node write_file_example.js
   ```

3. Check the directory for the new file `output.txt` containing:
   ```
   This is some new content for the file.
   ```

   **Explanation**:
   - `fs.writeFile()`: Writes data to a file. If the file doesn’t exist, it creates one. If it exists, it overwrites the content.

---

#### **3. Appending to a File**

1. Create a file named `append_file_example.js` with the following code:
   ```javascript
   // Importing the 'fs' module
   const fs = require("fs");

   const additionalContent = "\nThis is an appended line.";

   // Appending data to a file asynchronously
   fs.appendFile("output.txt", additionalContent, (err) => {
       if (err) {
           console.error("Error appending to the file:", err);
           return;
       }
       console.log("Content appended successfully!");
   });
   ```

2. Run the script:
   ```bash
   node append_file_example.js
   ```

3. Check the `output.txt` file for the appended content.

   **Explanation**:
   - `fs.appendFile()`: Adds data to the end of an existing file. If the file doesn’t exist, it creates one.

---

#### **4. Deleting a File**

1. Create a file named `delete_file_example.js` with the following code:
   ```javascript
   // Importing the 'fs' module
   const fs = require("fs");

   // Deleting a file asynchronously
   fs.unlink("output.txt", (err) => {
       if (err) {
           console.error("Error deleting the file:", err);
           return;
       }
       console.log("File deleted successfully!");
   });
   ```

2. Run the script:
   ```bash
   node delete_file_example.js
   ```

   **Explanation**:
   - `fs.unlink()`: Deletes a file.

---

### **Tasks for You**
1. Create a file named `my_notes.txt` and write content to it.
2. Append more content to `my_notes.txt`.
3. Read the content of `my_notes.txt`.
4. Finally, delete `my_notes.txt`.



---

## **Lesson 3: Node.js Modules**

### **What Are Modules?**
- In Node.js, **modules** are reusable blocks of code that can be imported into other files or modules.
- Node.js has:
  1. **Core Modules**: Built into Node.js (e.g., `fs`, `http`, `path`).
  2. **Local Modules**: Custom modules you create.
  3. **Third-Party Modules**: Installed via npm (Node Package Manager).

---

### **Core Modules**
Let’s explore some key built-in modules:
1. **`os`**: Provides information about the operating system.
2. **`path`**: Handles file paths.
3. **`fs`**: Interacts with the file system.

We’ll focus on the **`os` module** to start.

---

### **Using the `os` Module**

1. Create a new file named `os_module_example.js`.

2. Add the following code:
   ```javascript
   // Importing the 'os' module
   const os = require("os");

   // Get information about the current user
   const userInfo = os.userInfo();
   console.log("User Info:", userInfo);

   // Get the system uptime in seconds
   const uptime = os.uptime();
   console.log(`System Uptime: ${uptime} seconds`);

   // Get the operating system name and version
   console.log("Operating System:", os.type());
   console.log("OS Release:", os.release());

   // Get total and free memory
   console.log("Total Memory:", os.totalmem());
   console.log("Free Memory:", os.freemem());
   ```

3. Run the script:
   ```bash
   node os_module_example.js
   ```

---

### **Explanation**
- **`os.userInfo()`**: Returns details about the current user, such as username and home directory.
- **`os.uptime()`**: Returns the total time (in seconds) since the system was last booted.
- **`os.type()`**: Returns the operating system type (e.g., Linux, Darwin, Windows_NT).
- **`os.release()`**: Returns the OS version.
- **`os.totalmem()` and `os.freemem()`**: Provide total and available memory in bytes.

---

### **Task for You**
1. Run the above code and check the output.
2. Try adding more methods from the `os` module:
   - **`os.cpus()`**: Lists CPU details.
   - **`os.homedir()`**: Displays the home directory.
   - **`os.tmpdir()`**: Shows the temp directory.

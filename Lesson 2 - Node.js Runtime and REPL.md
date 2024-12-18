

---

## **Lesson 2: Node.js Runtime and REPL**

### **Node.js Runtime**
The Node.js runtime is what makes it possible to run JavaScript outside of the browser. It includes:
1. **V8 JavaScript Engine**: The same engine used by Chrome to execute JavaScript.
2. **C++ Libraries**: For handling things like file system access, networking, etc.
3. **Node.js APIs**: Modules that provide additional functionality (e.g., file handling, HTTP server creation).

---

### **What is REPL?**
REPL stands for:
- **R**: Read – It reads your input.
- **E**: Evaluate – It evaluates the input (runs it).
- **P**: Print – It prints the result of the evaluation.
- **L**: Loop – It waits for the next input (loops back).

The REPL is an interactive environment to run JavaScript code directly in the terminal. It’s great for testing small pieces of code quickly.

---

### **Using the REPL**
1. Open your terminal and type:
   ```bash
   node
   ```
   This starts the REPL. You should see a prompt like this:
   ```
   >
   ```

2. **Run some JavaScript code** directly in the REPL:
   ```javascript
   > console.log("Hello, REPL!");
   Hello, REPL!
   ```

3. **Basic Math Operations**:
   ```javascript
   > 5 + 3
   8
   > 10 * 2
   20
   ```

4. **Define and Use Variables**:
   ```javascript
   > let name = "Node.js";
   undefined
   > console.log("Welcome to " + name + "!");
   Welcome to Node.js!
   ```

5. **Call Functions**:
   ```javascript
   > function add(a, b) {
   ... return a + b;
   ... }
   undefined
   > add(10, 15);
   25
   ```

6. **Exit the REPL**:
   Type `.exit` or press `Ctrl+C` twice to exit.

---

### **What Happens in the REPL**
- Any variable you define remains available in the REPL session.
- Errors are shown immediately, helping you debug.
- You can experiment without creating files.

---

### **Task for You**
1. Start the REPL in your terminal.
2. Perform the following actions:
   - Print your name to the console.
   - Define a variable `age` and assign your age to it.
   - Write a function that takes two numbers and returns their product.
   - Call the function with `5` and `6`.

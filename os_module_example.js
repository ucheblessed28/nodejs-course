// Importing the 'os' MOdules
const os = require('os');

// Get information about the current user
const userInfo = os.userInfo();
console.log('User Info:', userInfo);

// Get the system uptime in seconds
const uptime = os.uptime();
console.log('System uptime:', uptime);

// Get the operating system name and version
console.log('Operating System:', os.type());
console.log('Operating System Version:', os.release());

// Get the total and free memory
console.log('Total memory:', os.totalmem());
console.log('Free memory:', os.freemem());
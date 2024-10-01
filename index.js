// Importing a custom module 'module.js'
// Make sure the file 'module.js' is in the same directory as this file
const operations = require("./module");

// index.js
// Run this file using the Node.js CLI with `node index.js`

// Basic function to print messages
function printMessage(message) {
  console.log(message);
}

// Calling the printMessage function to display a greeting
printMessage("Hello, World!");

// Using imported function
console.log("Sum of 3 and 5 is:", operations.add(3, 5));
console.log("Product of 4 and 6 is:", operations.multiply(4, 6));

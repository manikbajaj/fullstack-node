// module.js
// This module demonstrates the Node.js module exporting syntax.

// Function to add two numbers
function add(a, b) {
  return a + b;
}

// Function to multiply two numbers
function multiply(a, b) {
  return a * b;
}

// Exporting the functions using module.exports
module.exports = {
  add,
  multiply,
};

// The above export statement makes 'add' and 'multiply' functions available to other files when they import this module.

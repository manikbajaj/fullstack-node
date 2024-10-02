const fs = require("fs");

// Reading a file asynchronously
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data);
});

// Writing to a file asynchronously
const content = "Hello, world!";
fs.writeFile("example.txt", content, (err) => {
  if (err) {
    console.error("Error writing to file:", err);
    return;
  }
  console.log("File written successfully!");
});

// Renaming a file
fs.rename("example.txt", "new_example.txt", (err) => {
  if (err) {
    console.error("Error renaming file:", err);
    return;
  }
  console.log("File renamed successfully!");
});

// Deleting a file
fs.unlink("new_example.txt", (err) => {
  if (err) {
    console.error("Error deleting file:", err);
    return;
  }
  console.log("File deleted successfully!");
});

// Checking file stats
fs.stat("example.txt", (err, stats) => {
  if (err) {
    console.error("Error getting file stats:", err);
    return;
  }
  console.log(`File stats: ${JSON.stringify(stats)}`);
});

/*
This script demonstrates basic file operations using Node.js's fs module.
- Read, write, rename, delete files, and check their stats.
- It's crucial to handle errors in callbacks to prevent crashes and data loss.
*/

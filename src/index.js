const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const tasksRouter = require("./tasks/tasks.router.js");

const app = express();
const port = 3001;

//  Parsing request body
app.use(express.json());

// CORS options, here allowing all origins for demonstration purposes
// For production, you should specify allowed origins to tighten security
const corsOptions = {
  origin: "https://app.example.com", // Set specific origin or use '*' to allow all
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use CORS
// Enabled for all origins
app.use(cors());
// Only requests from example.com
// app.use(cors(corsOptions));

// Using Morgan for logging
/**
 * File System Module (fs): Used to create a writable stream for the file where logs will be saved.
 * Path Module (path): Helps with handling file paths.
 * Create Write Stream: fs.createWriteStream() is used to create a stream that Morgan will write log data to. The 'a' flag ensures that logs are appended to the file (access.log) instead of overwriting it.
 */

var accessLogStream = fs.createWriteStream(
  //! The 'path.join' method joins all given path segments together using the platform-specific separator
  // '__dirname' is a Node.js variable that gives the directory name of the current module
  // '..' moves up one directory level from the current directory
  // 'access.log' is the file name we want to access or create in the parent directory
  // ! File is igniored in gitignore by default and need not be sent to git
  path.join(__dirname, "..", "access.log"),
  {
    flags: "a",
  }
);
app.use(morgan("combined", { stream: accessLogStream }));

//  Defining Routes
app.use("/", tasksRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

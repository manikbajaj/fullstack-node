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

// Use CORS
// Enabled for all origins
app.use(cors());

// Creating and assinging a log file
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "access.log"),
  {
    flags: "a",
  }
);

// Using Morgan for logging
app.use(morgan("combined", { stream: accessLogStream }));

//  Defining Routes
app.use("/", tasksRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

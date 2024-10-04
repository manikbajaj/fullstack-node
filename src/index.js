const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const responseFormatter = require("./middleware/responseFormatter.js");
const tasksRouter = require("./tasks/tasks.router.js");
const authRouter = require("./auth/auth.router.js");
const userRouter = require("./user/user.router.js");
const { StatusCodes } = require("http-status-codes");

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

// Format Response
app.use(responseFormatter);

//  Defining Routes
app.use("/", tasksRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

// send back a 404 error for any unknown api request
// Sequence is important
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json(null);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

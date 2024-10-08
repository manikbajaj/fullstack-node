const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const responseFormatter = require("./middleware/responseFormatter.js");
const tasksRouter = require("./tasks/tasks.router.js");
const authRouter = require("./auth/auth.router.js");
const userRouter = require("./user/user.router.js");
const dotenv = require("dotenv");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const expressWinstonLogger = require("./middleware/expressWinston.middleware.js");

// Set the defaul environment
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Load Environment variables from different files based on environment
const envFile = `.env.${process.env.NODE_ENV}`;

// configure dotenv earlier in application
dotenv.config({ path: envFile });

const app = express();
const port = process.env.PORT;

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

// Use Winston Logger
app.use(expressWinstonLogger);

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

async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });
    console.log("Connnected To MongoDB");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    /** An exit code of 1 typically indicates that there was an error or abnormal termination of the program, which is often used to signal failure in scenarios where the program encounters critical issues that prevent normal operation. */
    process.exit(1);
  }
}

bootstrap();

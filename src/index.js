const express = require("express");
const tasksRouter = require("./tasks/tasks.router.js");

const app = express();
const port = 3001;

//  Parsing request body
app.use(express.json());

//  Creating a middleware
const myMiddleware = function (req, res, next) {
  // On request
  req.info = { appname: "Tasks Manager", author: "Cloudaffle" };

  // Do not return from the middleware
  next();
};

//  Using the middleware
app.use(myMiddleware);

//  Defining Routes
app.use("/", tasksRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

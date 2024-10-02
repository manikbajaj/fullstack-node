import { TasksRouter } from "./tasks/tasks.router.js";
import express from "express";

const app = express();
const port = 3001;

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
app.use("/", TasksRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

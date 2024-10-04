const express = require("express");

/*Fire the router function*/
const tasksRouter = express.Router();

// Get All Tasks
tasksRouter.get("/tasks", (req, res) => {
  return res.send("Hello World");
});

// POST Create a task
tasksRouter.post("/tasks", (req, res) => {
  // Body will be undefined without middleware
  console.log(req.body);
  // You get a JavaScript object
  console.log(typeof req.body);
  res.send("Create a new task");
});

// export the task router
module.exports = tasksRouter;

const express = require("express");

/*Fire the router function*/
const tasksRouter = express.Router();

// Get All Tasks
tasksRouter.get("/tasks", (req, res) => {
  console.log(req.info);
  return res.send("Hello World");
});

// POST Create a task
tasksRouter.post("/tasks", (req, res) => res.send("Create a new task"));

// export the task router
module.exports = tasksRouter;

const express = require("express");

/*Fire the router function*/
const tasksRouter = express.Router();

// Get All Tasks
tasksRouter.get("/tasks", (req, res) => res.send("All Tasks"));

// POST Create a task
tasksRouter.post("/tasks", (req, res) => res.send("Create a new task"));

// export the task router
module.exports = tasksRouter;

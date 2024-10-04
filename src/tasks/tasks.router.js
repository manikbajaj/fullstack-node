const express = require("express");
const tasksController = require("./tasks.controller.js");

/*Fire the router function*/
const tasksRouter = express.Router();

// Get All Tasks
tasksRouter.get("/tasks", tasksController.handleGetTasks);

// POST Create a task
tasksRouter.post("/tasks", tasksController.handlePostTasks);

// Get All Tasks
tasksRouter.patch("/tasks", tasksController.handlePatchTasks);

// POST Create a task
tasksRouter.delete("/tasks", tasksController.handleDeleteTasks);

// export the task router
module.exports = tasksRouter;

const express = require("express");
const tasksController = require("./tasks.controller.js");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const createTaskValidator = require("./validators/createTask.validator.js");
const getTasksValidator = require("./validators/getTasks.validator.js");

/*Fire the router function*/
const tasksRouter = express.Router();

// Get All Tasks
tasksRouter.get("/tasks", getTasksValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return tasksController.handleGetTasks(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

// POST Create a task
tasksRouter.post("/tasks", createTaskValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return tasksController.handlePostTasks(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

// Get All Tasks
tasksRouter.patch("/tasks", tasksController.handlePatchTasks);

// POST Create a task
tasksRouter.delete("/tasks", tasksController.handleDeleteTasks);

// export the task router
module.exports = tasksRouter;

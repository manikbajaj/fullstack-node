const express = require("express");
const tasksController = require("./tasks.controller.js");
const { StatusCodes } = require("http-status-codes");
const { body, validationResult } = require("express-validator");

/*Fire the router function*/
const tasksRouter = express.Router();

// Get All Tasks
tasksRouter.get("/tasks", tasksController.handleGetTasks);

// POST Create a task
tasksRouter.post("/tasks", body("title").notEmpty(), (req, res) => {
  const result = validationResult(req);
  //! See what happens when validation fails
  console.log(result);
  //! Add a condition to stop request if there are errors
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

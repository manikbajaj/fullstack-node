const express = require("express");
const tasksController = require("./tasks.controller.js");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const createTaskValidator = require("./validators/createTask.validator.js");
const getTasksValidator = require("./validators/getTasks.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validator.js");
const authenticateToken = require("../middleware/authenticateToken.middleware.js");

/*Fire the router function*/
const tasksRouter = express.Router();

tasksRouter.get(
  "/tasks",
  [getTasksValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return tasksController.handleGetTasks(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

// ! USIng ref refers the the correct schema and example of the schema is picked up as the default request as well

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   post:
 *     summary: Create a new Task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Shape of task response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Not Authorized error
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "You are not Authorized to perform this request"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Your token is either expired or invalid."
 */

tasksRouter.post(
  "/tasks",
  [createTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return tasksController.handlePostTasks(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

// Get All Tasks
tasksRouter.patch(
  "/tasks",
  [updateTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return tasksController.handlePatchTasks(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

// POST Create a task
tasksRouter.delete(
  "/tasks",
  [deleteTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return tasksController.handleDeleteTasks(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

// export the task router
module.exports = tasksRouter;

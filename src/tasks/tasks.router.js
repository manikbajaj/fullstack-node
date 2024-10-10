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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of tasks needed in a single response.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number of the tasks response.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: 'asc'
 *           enum: [asc, desc]
 *         description: Order of tasks ('asc' or 'desc').
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
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
 *       201:
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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   patch:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Shape of task response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskUpdate'
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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskDelete'
 *     responses:
 *       200:
 *         description: Shape of task response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskDelete'
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

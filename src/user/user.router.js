const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const userController = require("./user.controller.js");
const createUserValidator = require("./validators/createUser.validator.js");

const userRouter = express.Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Shape of task response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post("/create", createUserValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return userController.handleCreateUser(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = userRouter;

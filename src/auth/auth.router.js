const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const authController = require("./auth.controller.js");
const loginValidator = require("./validators/login.validator.js");

const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: Shape of task response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 */

authRouter.post("/login", loginValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return authController.handleLogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: A valid email address
 *         password:
 *           type: string
 *           description: Must be atleast 8 chars and contain a number, Capital letter and a special character
 *       example:
 *         email: john@doe.com
 *         password: Password123#
 */

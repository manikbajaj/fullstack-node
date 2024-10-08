const { query } = require("express-validator");

const getTasksValidator = [
  query("limit", "limit must be a valid integer").optional().isInt().toInt(),
  query("page", "page must be a valid integer").optional().isInt().toInt(),
  query("order", "order must be one of ['asc', 'dsc']")
    .optional()
    .isIn(["asc", "dsc"]),
];

module.exports = getTasksValidator;

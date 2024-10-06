const { body } = require("express-validator");

createTaskValidator = [
  //! Advantage of not chaining the methods is that you get a custom validation message for each validation failure.
  body("title", "The title cannot be blank").notEmpty(),
  body("title", "The title must be a string value").isString(),
  body("title", "The title must be at most 100 characters long").isLength({
    max: 100,
  }),
  // Sanitizers
  body("title", "The title must be a string value").trim(),
  // ! See problem with chaining the message should be generic, dueDate message needs to be "dueDate is required and valid ISO8601 string"
  body("dueDate", "dueDate need to be valid ISO8601 date string")
    .notEmpty()
    .isISO8601(),
  body("description", "The description must be a string value")
    .notEmpty()
    .isString()
    .trim(),
  body(
    "status",
    "The status must be one of ['todo', 'inProgress', 'completed']"
  )
    .isIn(["todo", "inProgress", "completed"])
    .notEmpty()
    .isString()
    .default("todo"), // assiging a defualt sanitizer
  body("priority", "The priority must be one of ['low', 'normal', 'high']")
    .isIn(["low", "normal", "high"])
    .notEmpty()
    .isString()
    .default("normal"),
];

module.exports = createTaskValidator;

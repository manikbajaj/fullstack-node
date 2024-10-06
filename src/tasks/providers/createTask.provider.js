const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");

async function createTaskProvider(req, res) {
  const validatedData = matchedData(req);
  //! matchedData(req) will get the validated and sanitized data and remove extra and unwanted fields from the incoming request as well.
  console.log(validatedData);
  const task = new Task(validatedData);

  // Insert the article in  MongoDB database
  return await task.save();
}

module.exports = createTaskProvider;

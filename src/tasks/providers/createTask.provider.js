const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

async function createTaskProvider(req, res) {
  const validatedData = matchedData(req);
  const task = new Task(validatedData);
  try {
    // Insert the article in  MongoDB database
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    //! The error object might contain debugging information and you might want to add this to server logs but not required to be shared with the end user of the application.
    //! Opportunity to create a log of errors
    console.log(error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = createTaskProvider;

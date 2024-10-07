const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const logger = require("../../helpers/winston.helper.js");

async function createTaskProvider(req, res) {
  const validatedData = matchedData(req);
  const task = new Task(validatedData);
  try {
    // Insert the article in  MongoDB database
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    logger.error(`Error while creating task: ${error.message}`, {
      // Manually log the error
      metadata: {
        // You can add additional metadata if necessary
        //  These are logged to the error.log
        statusCode: StatusCodes.GATEWAY_TIMEOUT,
        method: req.method,
        url: req.originalUrl,
        body: validatedData,
        completeError: error,
      },
    });
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = createTaskProvider;

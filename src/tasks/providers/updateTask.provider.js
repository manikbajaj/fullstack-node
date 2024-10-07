const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function updateTaskProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    const task = await Task.findById(req.body["_id"]).exec();

    //  Update the task
    task.title = validatedData.title || task.title;
    task.description = validatedData.description || task.description;
    task.dueDate = validatedData.dueDate || task.dueDate;
    task.priority = validatedData.priority || task.priority;
    task.status = validatedData.status || task.status;

    // Save it
    await task.save();
    return res.status(StatusCodes.OK).json(task);
  } catch (error) {
    errorLogger("Error while updating task: ", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = updateTaskProvider;

const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function getTasksProvider(req, res) {
  const data = matchedData(req);

  // Pagination required properties
  // Count of all documents
  const totalTasks = await Task.countDocuments();
  // Base URL
  const baseUrl = `${req.protocol}://${req.get("host")}${
    req.originalUrl.split("?")[0]
  }`;

  const tasks = await Task.find().limit().skip();
  try {
    // Insert the article in  MongoDB database
    const tasks = await Task.find();
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    errorLogger("Error while fetching task: ", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = getTasksProvider;

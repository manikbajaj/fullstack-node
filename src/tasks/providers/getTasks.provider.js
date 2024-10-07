const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

async function getTasksProvider(req, res) {
  // ! Since query params are not required we only need santized data and set the defaul values
  const data = matchedData(req);

  console.log(data);
  const tasks = await Task.find();

  return res.status(StatusCodes.OK).json(tasks);
}

module.exports = getTasksProvider;

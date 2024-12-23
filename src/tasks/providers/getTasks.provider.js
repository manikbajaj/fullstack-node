const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function getTasksProvider(req, res) {
  const data = matchedData(req);

  try {
    // Pagination required properties
    // Count of all documents
    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({ status: "completed" });
    const todoTasks = await Task.countDocuments({ status: "todo" });
    const inProgressTasks = await Task.countDocuments({ status: "inProgress" });

    // Base URL
    const baseUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl.split("?")[0]
    }`;

    // currentPage
    const currentPage = data.page;
    // limit
    const limit = data.limit;
    // sorting order
    const order = data.order;
    // Total pages
    const totalPages = Math.ceil(totalTasks / limit);
    // Next Page
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    // Previous Page
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;

    // Fetch Data
    const tasks = await Task.find({
      status: { $in: ["todo", "inProgress"] }, // Filter condition added here
    })
      .limit(limit)
      .skip(currentPage - 1)
      .sort({
        createdAt: data.order === "asc" ? 1 : -1,
      });

    let finalResponse = {
      data: tasks,
      pagination: {
        meta: {
          itemsPerPage: limit,
          totalItems: totalTasks,
          currentPage: currentPage,
          totalPages: totalPages,
          completedTasks,
          todoTasks,
          inProgressTasks,
        },
        links: {
          first: `${baseUrl}/?limit=${limit}&page=${1}&order=${order}`,
          last: `${baseUrl}/?limit=${limit}&page=${totalPages}&order=${order}`,
          current: `${baseUrl}/?limit=${limit}&page=${currentPage}&order=${order}`,
          next: `${baseUrl}/?limit=${limit}&page=${nextPage}&order=${order}`,
          previous: `${baseUrl}/?limit=${limit}&page=${previousPage}&order=${order}`,
        },
      },
    };

    return res.status(StatusCodes.OK).json(finalResponse);
  } catch (error) {
    errorLogger("Error while fetching task: ", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = getTasksProvider;

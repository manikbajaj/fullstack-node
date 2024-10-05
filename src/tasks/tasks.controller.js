const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js");

function handleGetTasks(req, res) {
  let response = [
    {
      title: "Title Of the Task",
      date: "2025-01-01T12:00:00Z",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
      priority: "normal",
      status: "todo",
    },
    {
      title: "Title Of the Task 2",
      date: "2025-01-01T12:00:00Z",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
      priority: "normal",
      status: "inProgress",
    },
  ];

  //! Status should be before response
  res.status(StatusCodes.OK).json(response);
}

// Convert the function to Async function
async function handlePostTasks(req, res) {
  const task = await createTaskProvider(req, res);
  res.status(StatusCodes.CREATED).json(task);
}

function handlePatchTasks(req, res) {
  res.send("PATCH tasks controller");
}

function handleDeleteTasks(req, res) {
  res.send("DELETE tasks controller");
}

module.exports = {
  handleGetTasks,
  handlePostTasks,
  handlePatchTasks,
  handleDeleteTasks,
};

const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Task = require("./task.schema.js");

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
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
  });

  // Insert the article in  MongoDB database
  await task.save();

  res.json(task);
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

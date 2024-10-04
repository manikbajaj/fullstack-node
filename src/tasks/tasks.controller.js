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
  res.status(200).json(response);
}

function handlePostTasks(req, res) {
  res.send("POST tasks controller");
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

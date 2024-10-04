const express = require("express");
const tasksRouter = require("./tasks/tasks.router.js");

const app = express();
const port = 3001;

//  Defining Routes
app.use("/", tasksRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

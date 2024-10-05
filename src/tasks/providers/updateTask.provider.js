const Task = require("../task.schema.js");

async function updateTaskProvider(req, res) {
  // Find the task first
  /**
   * Notice that we use the exec() Mongoose function. This is technically optional and returns a promise. In my experience, it’s better to use this function since it will prevent some head-scratching issues. If you want to read more about it, check out this note in the Mongoose docs about
   * promises
   * .
   */
  const task = await Task.findById(req.body["_id"]).exec();

  //  Update the task
  task.title = req.body.title;
  task.description = req.body.description;
  task.dueDate = req.body.dueDate;
  task.priority = req.body.priority;
  task.status = req.body.status;

  // Save it
  return await task.save();
}

module.exports = updateTaskProvider;

const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js");
const getTasksProvider = require("./providers/getTasks.provider.js");
const updateTaskProvider = require("./providers/updateTask.provider.js");

async function handleGetTasks(req, res) {
  return await getTasksProvider(req, res);
}

async function handlePostTasks(req, res) {
  return await createTaskProvider(req, res);
}

async function handlePatchTasks(req, res) {
  return await updateTaskProvider(req, res);
}

<<<<<<< Updated upstream
function handleDeleteTasks(req, res) {
  res.send("DELETE tasks controller");
=======
async function handleDeleteTasks(req, res) {
  return await deleteTaskProvider(req, res);
>>>>>>> Stashed changes
}

module.exports = {
  handleGetTasks,
  handlePostTasks,
  handlePatchTasks,
  handleDeleteTasks,
};

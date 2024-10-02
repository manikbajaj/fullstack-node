import { Router } from "express";

/*Fire the router function*/
export const TasksRouter = Router();

// Get All Tasks
TasksRouter.get("/tasks", (req, res) => {
  return res.send("Hello World");
});

// POST Create a task
TasksRouter.post("/tasks", (req, res) => {
  // Body will be undefined without middleware
  console.log(req.body);
  // You get a JavaScript object
  console.log(typeof req.body);
  res.send("Create a new task");
});

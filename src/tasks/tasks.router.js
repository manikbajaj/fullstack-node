import { Router } from "express";

/*Fire the router function*/
export const TasksRouter = Router();

// Get All Tasks
TasksRouter.get("/tasks", (req, res) => {
  console.log(req.info);
  return res.send({ data: "tasks" });
});

// POST Create a task
TasksRouter.post("/tasks", (req, res) => res.send("Create a new task"));

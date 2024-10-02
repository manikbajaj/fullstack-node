import { Router } from "express";

/*Fire the router function*/
export const TasksRouter = Router();

// Get All Tasks
TasksRouter.get("/tasks", (req, res) => res.send("All Tasks"));

// POST Create a task
TasksRouter.post("/tasks", (req, res) => res.send("Create a new task"));

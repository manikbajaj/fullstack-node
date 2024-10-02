import { TasksRouter } from "./tasks/tasks.router.js";
import express from "express";

const app = express();
const port = 3001;

//  Defining Routes
app.use("/", TasksRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

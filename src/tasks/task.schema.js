const { Schema } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    //! can also be required: true without message
    required: [true, "Task title is required"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Task description is required"],
    trim: true,
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  status: {
    type: String,
    required: [true, "Task status is required"],
    enum: ["pending", "inProgress", "completed"],
    default: "pending",
  },
  priority: {
    type: String,
    required: [true, "Task priority is required"],
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
  },
});

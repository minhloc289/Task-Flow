import { Response } from "express";
import TaskModel from "../../models/Tasks.js";
import { AuthRequest } from "../../middlewares/auth.js";
import mongoose from "mongoose";

// Controller for handling task-related operations

// @desc Get all tasks for the authenticated user
export const getMyTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Ensure userId is valid and type is ObjectId
    const tasks = await TaskModel.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    res.status(200).json(
      tasks.map((task) => ({
        ...task.toObject(),
        id: task._id,
      }))
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Create a new task for the authenticated user
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      console.error("Unauthorized: No user ID found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description, priority, status, dueDate, category } =
      req.body;

    if (!title || !description || !dueDate) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    const newTask = new TaskModel({
      title,
      description,
      priority,
      status,
      dueDate,
      category,
      userId: new mongoose.Types.ObjectId(userId),
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(await newTask.save());
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update an existing task for the authenticated user
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const taskId = req.params.id;

    if (!userId || !taskId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { _id, id, createdAt, ...rest } = req.body

    const task = await TaskModel.findOneAndUpdate(
      { _id: taskId, userId: new mongoose.Types.ObjectId(userId) },
      rest,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete a task for the authenticated user
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const taskId = req.params.id;

    if (!userId || !taskId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const task = await TaskModel.findOneAndDelete({
      _id: taskId,
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

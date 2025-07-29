import { Response } from 'express'
import TaskModel from '../../models/Tasks.js'
import { AuthRequest } from '../../middlewares/auth.js'
import mongoose from "mongoose"

export const getMyTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    
    // Ensure userId is valid and type is ObjectId
    const tasks = await TaskModel.find({
        userId: new mongoose.Types.ObjectId(userId)
    })

    res.status(200).json(tasks.map(task => ({
        ...task.toObject(),
        id: task._id,
    })))
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    
    if (!userId) {
      console.error('Unauthorized: No user ID found')
      return res.status(401).json({ message: 'Unauthorized' })
    }

    

    const { title, description, priority, status, dueDate, category } = req.body

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: 'Please fill in all required fields' })
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
    })

    res.status(201).json(await newTask.save())

  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

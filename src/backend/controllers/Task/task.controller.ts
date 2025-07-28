import { Response } from 'express'
import TaskModel from '../../models/Tasks.js'
import { AuthRequest } from '../../middlewares/auth.js'
import mongoose from "mongoose"

export const getMyTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    
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

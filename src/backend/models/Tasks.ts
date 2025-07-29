import mongoose, { Document, Schema } from 'mongoose'

export interface ITask extends Document {
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in-progress' | 'completed'
  dueDate: string
  category: string
  createdAt: string
  userId: mongoose.Types.ObjectId 
}

const TaskSchema: Schema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
    default: 'todo',
    required: true,
  },
  dueDate: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: {
    type: String,
    default: () => new Date().toISOString(),
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  }
})


// If the model already exists, return it. Otherwise, create a new one.
const TaskModel = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema)

export default TaskModel

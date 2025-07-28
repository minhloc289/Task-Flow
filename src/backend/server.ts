import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './connect.js'
import authRoutes from './routes/auth.route.js'
import taskRoutes from './routes/Task/task.route.js'

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json())

// Define routes

// @desc Authentication routes
// @route /api/auth
app.use('/api/auth', authRoutes)

// @desc Task routes
// @route /api/tasks
app.use('/api/tasks', taskRoutes);


// @desc Check if the server is running
connectDB()
  .then(() => {
    console.log("🚀 Starting server...")
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error("App failed to start:", err)
  })
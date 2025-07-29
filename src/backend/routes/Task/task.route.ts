import express from 'express'
import { getMyTasks } from '../../controllers/Task/task.controller.js'
import { createTask } from '../../controllers/Task/task.controller.js'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

// @desc Get my tasks
// @route GET /api/tasks/me
router.get('/me', auth, getMyTasks)

// @desc Create a new task
// @route POST /api/tasks
router.post('/createTask', auth, createTask)


export default router

import express from 'express'
import { getMyTasks } from '../../controllers/Task/task.controller.js'
import { createTask } from '../../controllers/Task/task.controller.js'
import { updateTask } from '../../controllers/Task/task.controller.js'
import { deleteTask } from '../../controllers/Task/task.controller.js'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

// @desc Get my tasks
// @route GET /api/tasks/me
router.get('/me', auth, getMyTasks)

// @desc Create a new task
// @route POST /api/tasks
router.post('/createTask', auth, createTask)

// @desc Update a task
// @route PUT /api/tasks/:id
router.put('/updateTask/:id', auth, updateTask)

// @desc Delete a task
// @route DELETE /api/tasks/:id
router.delete('/deleteTask/:id', auth, deleteTask)


export default router

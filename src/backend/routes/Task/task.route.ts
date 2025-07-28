import express from 'express'
import { getMyTasks } from '../../controllers/Task/task.controller.js'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

router.get('/me', auth, getMyTasks)

export default router

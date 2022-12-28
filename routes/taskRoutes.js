import express from 'express'
import { getAllTasks, createTask } from '../controllers/taskController'
const router = express.Router()

router.get('/', getAllTasks).post('/', createTask)

export default router

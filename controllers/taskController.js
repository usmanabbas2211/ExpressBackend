import { ok, server_error } from '../helpers/responseHelper'
import { TaskModel } from '../models/Task'

export const getAllTasks = async (req, res) => {
    const userId = req.user.aud
    let tasks
    try {
        tasks = await TaskModel.find({ userId })
    } catch (err) {
        return server_error(res, err)
    }
    return ok(res, 200, { tasks: tasks })
}

export const createTask = async (req, res) => {
    const { userId, heading, description } = req.body
    const task = new TaskModel({
        userId,
        heading,
        description,
    })
    let newTask
    try {
        newTask = await task.save()
    } catch (err) {
        return server_error(res, err)
    }
    return ok(res, 201, { task: newTask })
}

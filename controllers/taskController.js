const { ok, bad_request, server_error } = require('../helpers/responseHelper')
const Task = require('../models/Task')

exports.getAllTasks = async (req, res, next) => {
    // console.log(req)
    const userId = req.user.aud
    let tasks
    try {
        tasks = await Task.find({ userId })
    } catch (err) {
        return server_error(res, err)
    }
    return ok(res, 200, { tasks: tasks })
}

exports.createTask = async (req, res, next) => {
    const { userId, heading, description } = req.body
    const task = new Task({
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

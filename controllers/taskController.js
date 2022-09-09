const { ok, bad_request, server_error } = require('../helpers/responseHelper')

exports.getAllTasks = async (req, res, next) => {
    return ok(res, 200, { done: 'done' })
}

exports.createTask = async (req, res, next) => {}

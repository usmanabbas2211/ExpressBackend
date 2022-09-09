const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    userId: {
        ref: '',
    },
    heading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('Task', taskSchema)

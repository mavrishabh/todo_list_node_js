const mongoose = require('mongoose');

// Creating Schema for the TODO Application
const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        // required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
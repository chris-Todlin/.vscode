/* Thsi is the model of the todo */
const mongoose = require("mongoose");

// create the schema of the todo
const todoSchema  = new mongoose.Schema({
    name: {type: String, required: true},
    completed: {type: Boolean, default: false},
    deleted: {type: Boolean, default: false}
})


// create the model of the todo
exports.Todo = mongoose.model("Todo", todoSchema);
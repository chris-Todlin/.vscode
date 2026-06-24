/* This is the model for the task  */
const mongoose = require("mongoose");

// create the user schema
const taskSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    description: {type: String, default: "A movie to watch"},
    category: {type: String, default: "Movie"},
    createdAt: {type: String, default: Date.now()}
});

// ceate the model for that
const Task = mongoose.model("task",taskSchema);

// export it out for the user
exports.Task = Task;
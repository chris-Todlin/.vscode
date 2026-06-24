const mongoose = require("mongoose");

// now define the model of the task then user
const taskSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: String,
    description: {type: String, required: true},
    status: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

// Getting the model done
const Task = mongoose.model("Task", taskSchema);

// Export the model
module.exports = Task;
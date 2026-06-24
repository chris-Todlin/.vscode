/* The model for the task in talking or th ene we are going to implement*/

/* modules required */
const mongoose = require("mongoose");

// create the task schema
const taskSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    description: String, 
    category: String, 
    status: {type: Boolean, default: false}, // false - reading or true - completed,
    createdAt: {type: String, default: Date.now()},
    updatedAt: {type: String, default: Date.now()}
});

// now create the model of the task
const Task = mongoose.model("Task", taskSchema);

// export it out for use
exports.Task = Task; // done
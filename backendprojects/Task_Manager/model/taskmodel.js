/* 
    -> Model for the task 
        - title 
        - description
        - category
*/

// import the mongoose module
const mongoose = require("mongoose");

// create the schema
const taskSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true, default: "New Task"},
    description: {type: String, required: true, default: "This is a new task."},
    category: {type: String, default: "general"}
});

// now create the model 
const Task = mongoose.model("Task", taskSchema); // done

// export for use now b other cointries
module.exports = Task;
/* 
    This is the model of the task initiate by mongoose.
    It has the following: 
        - title (use drive on default to the one there in)
        - id  (mongoddb driven)
        - description (use driven)
        - category (work/personal)
        - status (false/true) -> Completed or not
*/

// the module on the frontline
const mongoose = require("mongoose");

// the shema of the task now
const taskSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true, default: "Task title"},
    description: String,
    category: {type: String, default: "personal"},
    status: {type: Boolean, default: false}
});

// export the schema out for the data folder to access and use it
module.exports.task = mongoose.model("Task", taskSchema); 

// done, go to sleep now kiddo
/* The model for the todo structure in the database */
const mongooose = require("mongoose");

// create the new schema
// for now it is onl a string ojects
const todoSchema = new mongooose.Schema({
    username: {type: mongooose.Schema.Types.ObjectId, ref: "User"},
    todo: String,
    createdAt: {type: Date, default: Date.now}
});

// now created the model
const Todo = mongooose.model("TODO",todoSchema);

module.exports = Todo;
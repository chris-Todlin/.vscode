const mongoose = require("mongoose");

// setupt the schema
const expenseSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, required: true},
    description:{type: String, required: true},
    amount: Number
});

const expenseModel = mongoose.model("Expense", expenseSchema);
module.exports = expenseModel;
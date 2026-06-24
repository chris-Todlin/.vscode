/* The model for the game stats */
const mongoose = require("mongoose");

/* Creating the schema */
const gameStatSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: "User", required:true},
    level: {type: String, default: easy},
    score: {type: Number, default: 0},
    playDate: {type: Date, default: Date.now()}
});

/* Xreate the model */
const GameStat = mongoose.model("GameStats",gameStatSchema);

/* Export it */
module.exports = GameStat;
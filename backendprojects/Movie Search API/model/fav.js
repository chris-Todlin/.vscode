/* This is the model of the fav for now */
const mongoose = require("mongoose");

// create the schema - username later
const favSchema = new mongoose.Schema({
    title: {type: String, required: true}
});

// create the model 
const Fav = mongoose.model("fav",favSchema);

// export it out
exports.Fav = Fav;
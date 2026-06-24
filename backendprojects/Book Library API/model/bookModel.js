/* This is the model of the book */

// require the modules 
const mongoose = require("mongoose");

// create the schema of the model 
const bookSchema = new mongoose.Schema({
    ISBN: {type: String, unique: true, required: true},
    title: {type: String, required: true},
    author: String, 
    genre: String, 
    createdAt: {type: String, default: Date.now()},
    updatedAt: {type: String, default: Date.now()} // this would be added by the js function
});

// now deal with the model creation 
const Book = mongoose.model("Book",bookSchema); 


// export it out for user by other modules
exports.Book = Book;
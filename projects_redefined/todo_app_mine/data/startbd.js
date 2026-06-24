/*
    This is the file to staart eh database of theserver. 
    It would handle the start and print out the message to indicate the database is connected
    It error, message is spited out
*/

const mongoose = require("mongoose");

// function to do so 
module.exports.startDB = async function(){
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/todo_app_mine");

        if(db){
            console.info("Database connected!");
        } else {
            console.log("Database was not connected sucessfully!");
        }
    } catch (error) {
        console.error(error.stack); // print the message out
    }
}
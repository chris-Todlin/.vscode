/* 
    This is the file to start the db outside the main function of the calling
    it uses the mongoose module to do so.
*/

const mongoose = require("mongoose");

// start the db 
module.exports.startDB = async function(){
    try{
        const db = await mongoose.connect("mongodb://localhost:27017/project1-task-manager");

        if(db) console.log("Database connected!");
        else  console.log("Error in connecting to the database!");
    } catch(e){
        console.error(e);
    }
}
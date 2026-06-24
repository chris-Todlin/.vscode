/* 
    PERSONAL BLOG API   
    - This is the model of the log:
        -> title
        -> content
        -> Author 
        -> Category 
        -> Publich date
    - These are the main blog properties if it were a class
    - We would use the mongoose to create its table
    - Hop on, as we create the on the of the type machine in the literal part of it
*/

// the module using COMMONJs
const mongoose = require("mongoose");

// create the schema of the blog
const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: String,
    category: String,
    publishDate: {type: String, default: Date.now} // intiate by the code itself not inputted
}); // this is the basic structure of the blog

// nowcreate the model to satisfy the blog or for the imteraction with other parts of the code
module.exports.Blog = mongoose.model("Blog", blogSchema); // exported out for income
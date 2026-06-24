/* 
    update, wow, love that in the past but now I want to tell you I am cooked
    Should it just toggle to prevent it being from fetch or
    Delete it really from the db
    Choose one, but let me tell you, you are fucked already
*/
const {Blog} = require("../models/model-blog"); // the module to play around with the db

// function to update by ID
module.exports.updateBlogById = async function(id, updateData, next){
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { returnDocument: "after" }); // allin one funciton
        return updatedBlog;
    } catch (error) {
        next(error); // bouncy baby here you are
    }
}
/* 
    Explained it already, it fetched the blogs from wherver is is goin to fetch from
    Love it though, it is great and nice with all the patches in the livein part
*/
const {getAllBLogsByAuthor, getAllBLogsByCategory, getAllBlogs, getBlogById} = require("../controllers/blog-fetch")

// function to deal with by all the bloger
module.exports.fetchBlogs = async function(req,res,next){
    try {
        const blogs = await getAllBlogs(next); // get all the blogs
        res.json(blogs); // send them to the user
    } catch (error) {
        next(error);
    }
}

// function for the by authro 
module.exports.fetchBlogsByAuthor = async function(req,res,next){
    try {
        const blogs = await getAllBLogsByAuthor(req.params.author, next); // get all the blogs by a specific author
        res.json(blogs); // send them to the user
    } catch (error) {
        next(error);
    }
}

// function for the by category
module.exports.fetchBlogsByCategory = async function(req,res,next){
    try {
        const blogs = await getAllBLogsByCategory(req.params.category, next); // get all the blogs by a specific author
        res.json(blogs); // send them to the user
    } catch (error) {
        next(error);
    }
}

// fethc by single blog by the id
module.exports.fetchBlogById = async function(req,res,next){
    try {
        const blog = await getBlogById(req.params.id, next); // get the blog with the specified id
        res.json(blog); // send it to the user
    } catch (error) {
        next(error);
    }
}
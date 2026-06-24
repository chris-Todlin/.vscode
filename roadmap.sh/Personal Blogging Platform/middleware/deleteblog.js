/* 
    Really, you interfance the user witht the lower level function
    Love that, hope so 
*/

const {deleteBlogById} = require("../controllers/delete-blog");

// the function now to interface the middleware
module.exports.deleteBlog = async function(req,res,next){
    try {
        const deletedBlog = await deleteBlogById(req.params.id, next);
        if(!deletedBlog) return res.status(404).json({message: "Blog not found"});
        return res.json(deletedBlog);
    } catch (error) {
        next(error);
    }
}
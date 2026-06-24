/* 
    This is not the connector bewteen the request and the real database, it does that witht he help of the 
    controller to acces the data int he db
*/

const {CreateBlog} = require("../controllers/blog-add")

module.exports.createBlog = async function(req,res,next){
    try {
        console.log("Recieved a blog creatign requedt!");
        console.log(req.body);
        if(req.body){
            const created = await CreateBlog(req,next);

            if(created) return res.json({message: created});
            return res.json({message: "Unable to create blog"});
        } else {
            return res.json({message: "There is no data to create the blog"});
        }
    } catch (error) {
        next(error); // throw it out the error
    }
}
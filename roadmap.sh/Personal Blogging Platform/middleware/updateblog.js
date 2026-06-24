/* 
    Really, you interfance the user witht the lower level function
    Love that, hope so 
*/

const {updateBlogById} = require("../controllers/update-blog");
const {db} = require("../config/sqlitedb"); // for the sqlite3 database

// the function now to interface the middleware
module.exports.updateBlog = async function(req,res,next){
    try {
        const updatedBlog = await updateBlogById(req.params.id, req.body, next);
        const idUse = 1;
        const updateSqlite = await new Promise((resolve,reject)=>{
            db.run("UPDATE blogs SET title = ?, content = ? WHERE id = ?", [req.body.title, req.body.content, idUse], (err) => {
                if (err) reject(err);
                else resolve({message: "Blog updated successfully in SQLite"});
            });
        });
        if(!updatedBlog) return res.status(404).json({message: "Blog not found"});
        return res.json(updatedBlog);
    } catch (error) {
        next(error);
    }
}
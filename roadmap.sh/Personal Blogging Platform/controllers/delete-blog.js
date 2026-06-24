/* 
    Delete, wow, love that in the past but now I want to tell you I am cooked
    Should it just toggle to prevent it being from fetch or
    Delete it really from the db
    Choose one, but let me tell you, you are fucked already
*/
const {Blog} = require("../models/model-blog"); // the module to play around with the db
const {db} = require("../config/sqlitedb"); // the db to play around with it

// function to delte by ID
module.exports.deleteBlogById = async function(id,next){
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id); // allin one funciton
        const idUse = 1;
        const deleteSqlite = await new Promise((resolve,reject)=>{
            db.run("DELETE FROM blogs WHERE id = ?", [idUse], (err) => {
                if (err) reject(err);
                else resolve({message: "Blog deleted successfully from SQLite"});
            });
        });
        return {
            deletedBlog,
            deleteSqlite
        };
    } catch (error) {
        next(error); // bouncy baby here you are
    }
}
/* The fallback file in the routes */
exports.index = function(req,res){
    res.render("index",{title: 'Home'});
}
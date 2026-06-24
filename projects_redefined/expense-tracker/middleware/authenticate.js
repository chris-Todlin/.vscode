// must be authetiated
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else {
        req.flash("info", "You must login to see this page");
        return res.redirect("/");
    }
}

// function to ensure that the one 
function ensureIsOut(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect("/expense/");
    } else {
        next();
    }
}

module.exports.ensureAuthenticated = ensureAuthenticated;
module.exports.ensureIsOut = ensureIsOut;
/* Two function to check of the user is logged in or not */

// function for the logged in
function loggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    // else redirect
    req.flash("info", "You must be logged in to se this content.")
    return res.status(403).redirect("/login");
}

/* not logged in */
function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }

    return res.status(401).redirect("/");
}

/* export them out  */
module.exports.loggedIn = loggedIn;
module.exports.notLoggedIn = notLoggedIn;
/* 
    -> It's work is to ensure the user is either allowed or not
*/

// function to handle the case of the authentucated and not
function isAuthent(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else {
        // else redirect
        req.flash("info","You must be authenticated to access this");
        res.redirect("/");
    }
}

function notAuthenticated(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }

    // else redirect
    return res.redirect("/tasks");
}

// export it out
module.exports.isAuthent = isAuthent;
module.exports.notAuthenticated = notAuthenticated;
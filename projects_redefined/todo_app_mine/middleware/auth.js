/* 
    This function in here are to check whether the user is looggen in or not
    - They hel control the user from sing in when sing in and all that data there in
    - The also help in control structure ans streamline some deadmates
*/

module.exports.loggedIn = function(req,res,next){
    try {
        if(req.isAuthenticated()){
            return next();
        }

        // else redirect to another path 
        req.flash("info","You must be signned in. redirectin you to a new page...");
        res.redirect("/login");
    } catch (error) {
        next(error);
    }
}

// function to find is the user is loget out for an action to happend on not
module.exports.loggedOut = function(req,res,next){
    try {
        if(req.isAuthenticated()){
            res.redirect("/");
            return next();
        }

        return next(); // continue with the flow
    } catch (error) {
        next(error);
    }
}
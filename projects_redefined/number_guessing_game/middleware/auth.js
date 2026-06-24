/* Function require for the authentication */

/* function to check if the user is authenticated */
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        next(); // continue, logged in
    } else {
        req.flash("info", "You must be logged in to view this content");
        return res.redirect("/");
    }
}

/* Function to ensure the user is not authenticated */
// forou to signup or login ou must not the logged in
function notLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        // tell them why you redirected them
        req.flash("info","You are already signed in!");
        return res.redirect("/"); // to be decided
    } else {
        next(); // continue, logged in
    }
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.notLoggedIn = notLoggedIn;
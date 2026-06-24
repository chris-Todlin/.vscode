/* This is the function to set up the session to use in the js file */

function initializeSession(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error") || [];
    res.locals.infos = req.flash("info") || [];
    // now continue
    next();
}

module.exports = initializeSession;
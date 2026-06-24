/* Function to male the currentUser, infos and errors local */
function localVaraiables(req,res,next){
    // make them available to all the views
    res.locals.currentUser = req.user;
    res.locals.infos = req.flash("info") ;
    res.locals.errors = req.flash("error");

    // then go next
    next();
}

module.exports = localVaraiables;
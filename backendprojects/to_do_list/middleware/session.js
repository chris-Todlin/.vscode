/* This is a middleware to save the session of the user or initialize */

function sessionInitialize(req,res,next){
    // The req.locals for the messages inclided
    res.locals.infos = req.flash("info") || [];

    // then initiate the session
    if(req.session.user){
        // go to the next middlware
        next();
        return;
    }

    // before going to the next create the session
    const username = req.headers['user-agent'];
    const id = Date.now();

    // Now add the item
    req.session.user = {username: username, id: id};

    // now procede
    next();
}

// Export it for user
module.exports = sessionInitialize; // to be used be for any session
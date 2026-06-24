/* Middlewaret oo esnure ath or not */

function Auth(req,res,next){
    if(req.isAuthenticated()){
        next();
    }

    // else return a message
    return res.status(403).json("Not Allowed");
}

function notAuth(req,res,next){
    if(!req.isAuthenticated()){
        console.log("I am in here");
        next();
    }

    // else return a message
    console.log("I am in here too");
    return res.status(403).json("Not Allowed");
}

// export tem out
exports.Auth = Auth;
exports.notAuth = notAuth;
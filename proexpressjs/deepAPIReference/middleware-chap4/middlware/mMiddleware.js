/* This is a typical middleware format */
function myMiddleware(req,res,next){
    console.log("I am a middleware");
    next(); // continue to the next
}

// a logger middleware for the data and the request in the house
function logReq(req,res,next){
    // print the date, req.url ans the status 
    console.log("%s %s - %s",req.method, req.url, new Date().toString())
    next(); // continue
}

exports.myMiddleware = myMiddleware;
exports.logReq = logReq;
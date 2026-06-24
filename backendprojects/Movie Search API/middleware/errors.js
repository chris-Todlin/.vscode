/* This middleware is to provide the functionality of the error handling */

function handler404(req,res,next){
    res.status(404).render("404");
}

function handler500(err,req,res,next){
    console.error(err.stack); // print out the error
    res.status(500).render("500");
}

exports.handler404 = handler404;
exports.handler500 = handler500;
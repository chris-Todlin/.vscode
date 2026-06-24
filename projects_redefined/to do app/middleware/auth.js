/* This would authorusie the user */
function authoriseUser(req,res,next){
    if(!req.session.user){
        console.log('not authorised');
        res.status(401).send('Not Authorised');
        return;
    }

    console.log('authorised');
    next();
}

module.exports = authoriseUser;
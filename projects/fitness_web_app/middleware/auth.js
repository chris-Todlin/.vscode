const users = require("../data/users")

// function to check if the user exist
module.exports = function(){
    app.use((req,res,next)=>{
        if(req.session.user){
            res.status(401).json({message: "not exist"});
            return;
        }

        next();
    })
}
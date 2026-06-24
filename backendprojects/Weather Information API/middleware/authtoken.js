/* This is the file to take in the authentication token */
const jwt = require("jsonwebtoken");

// function to authenticate the token
function authenticateToken(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "Token missing"});
    }

    // verfy if the token is there
    jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
        if(err) {
            return res.status(403).json({message: "Invalid or expired token"});
        }

        req.user = decoded;
        console.log(decoded);
        next();
    })
}

module.exports = authenticateToken;
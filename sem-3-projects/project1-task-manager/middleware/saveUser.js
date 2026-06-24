/* This function is going to save the user and set him right into the matrix meeded */
// get the user in
const User = require("../model/userModel"),
passport = require("passport");

module.exports = async function(req,res, next){
    try{
        const data = req.body;
        const user = await User.findOne({username: data.username});

        if(user){
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // else create the user
        await User.create({
            username: data.username,
            password: data.password,
            bio: ''
        });

        console.log('User Created!');

        passport.authenticate('login', function(err, user, info){
            if(err){
                return next(err);
            }

            if(!user){
                return res.status(401).json({ success: false, message: info?.message || 'Login failed after signup' });
            }

            req.logIn(user, function(err){
                if(err){
                    return next(err);
                }

                if(req.get('Accept')?.includes('application/json')){
                    return res.json({ success: true, message: 'Signup successful. Redirecting...', redirect: '/' });
                }

                return res.redirect('/');
            });
        })(req,res,next);
    }
    catch(e){
        next(e); // the error internal way
    }
}
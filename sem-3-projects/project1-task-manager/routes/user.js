/* 
    This is the routes for the user in all the acti ities required to be used by the user
    -> login
    > Sign up
    ->  dashboard
*/

const userRouter = require("express").Router();
const passport = require("passport");
const signUpUser = require("../middleware/saveUser");
const auth = require("../middleware/auth");

userRouter.route("/signup")
    .get(auth.ensureGuest, (req, res) => {
        res.render("signup");
    })
    .post(signUpUser);

userRouter.route("/login")
    .get(auth.ensureGuest, (req, res) => {
        res.render("login");
    })
    .post((req, res, next) => {
        passport.authenticate("login", function(err, user, info){
            if(err){
                return next(err);
            }

            if(!user){
                return res.status(401).json({ success: false, message: info?.message || 'Login failed' });
            }

            req.logIn(user, function(err){
                if(err){
                    return next(err);
                }

                return res.json({ success: true, message: 'Login successful', redirect: '/user/dashboard' });
            });
        })(req, res, next);
    });

userRouter.get("/dashboard", auth.ensureAuth, (req, res) => {
    res.render("dashboard", { user: req.user });
});

userRouter.post("/logout", auth.ensureAuth, (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/user/login');
    });
});

module.exports = userRouter;
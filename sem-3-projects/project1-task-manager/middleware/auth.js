module.exports = {
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated && req.isAuthenticated()){
            return next();
        }
        return res.redirect('/user/login');
    },

    ensureGuest: function(req, res, next){
        if(req.isAuthenticated && req.isAuthenticated()){
            return res.redirect('/user/dashboard');
        }
        next();
    }
};

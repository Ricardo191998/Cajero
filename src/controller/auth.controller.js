const authCtrl = {};

const passport = require('passport');


authCtrl.renderSignIn = (req, res, next) => {
    res.render('signin');
};


authCtrl.signIn = passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
});

authCtrl.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/signin');
};

module.exports = authCtrl;
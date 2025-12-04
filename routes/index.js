var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require("./users");
const LocalStrategy = require("passport-local").Strategy;

// Passport setup
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Home
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

// Profile route
router.get("/profile", isLoggedIn, function(req, res) {
    res.send("/profile");
});

// Register
router.post("/register", function(req, res) {
    const { username, email, fullName, password } = req.body;

    const userData = new User({
        username,
        email,
        FullName: fullName,
    });

    User.register(userData, password)
        .then(() => {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/profile");
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect("/");
        });
});

// Login
router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/"
    })
);

// Logout
router.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if (err) return next(err);
        res.redirect('/');
    });
});

// Auth middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
}

module.exports = router;
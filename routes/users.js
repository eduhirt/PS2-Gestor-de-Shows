var express = require('express');
var router = express.Router();
var User = require('../models/userSchema.js');
var passport = require('passport');


router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  var db = req.db;
  var usr = new User({
    username:  req.body.email,
    email: req.body.email,
    password: req.body.password 
  });
  // call the built-in save method to save to the database
  usr.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully!');
    res.redirect('/login');
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
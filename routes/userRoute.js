var express = require('express');
var router = express.Router();
var User = require('../models/userSchema.js');

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  User.register(new User({ email : req.body.email }), req.body.password, function(err, account) {
      if (err) {
          return res.render('register', { account : account });
      }

      passport.authenticate('local')(req, res, function () {
          res.redirect('/');
      });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
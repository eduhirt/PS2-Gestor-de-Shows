var express = require('express');
var router = express.Router();
var User = require('../models/userSchema.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});




/* GET Hello World page. */
router.get('/helloworld', function(req, res, next) {
    res.render('helloworld', { title: 'Hello, World!' });
});




/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var users = {};
    User.find({}, function(err, users) {
        console.log(users);
        res.render('userlist', {
            "users" : users
        });
    
    });
    
});




/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Criar Conta' });
});




/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    //var collection = db.get('usercollection');



    // Submit to the DB
    // create a new user called chris
    var chris = new User({
        name: userName,
        email: userEmail,
        password: 'password' 
    });
    // call the built-in save method to save to the database
    chris.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully!');
    });

/*
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
    */
});


/* PÁGINA TESTE DE ADMINISTRADOR */
router.get('/admin', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
    res.render('admin', { title: 'Admin Page' });
});


module.exports = router;

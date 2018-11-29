var express = require('express');
var router = express.Router();
var User = require('../models/userSchema.js');
var Show = require('../models/showSchema.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user)
    Show.find({}, function(err, shows) {
        console.log(shows);
        res.render('index', {
            "shows" : shows.reverse()
        });
      });
});

router.get('/test', function(req, res, next) {
    res.render('test', {
    });
});

router.get('/pagina_teste', function(req, res, next) {
    res.render('pagina_teste', {
    });
});

router.get('/sys', function(req, res, next) {
    res.render('sys', {
    });
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


/* GET New Event page. */
router.get('/newevent', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
    res.render('newevent', { title: 'Publicar evento' });
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
    var userCompleteName = req.body.usercompletename;
    var userEmail = req.body.useremail;
    var userName = req.body.username;
    var password = req.body.password;


    var user = new User({
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

var responses_x_questions = require('../public/reports/report.json');  
var clone = require('clone');  
var echarts = require('echarts');


/* PÁGINA TESTE DE ADMINISTRADOR */
router.get('/admin', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    var db = req.db;
    User.find({}, function(err, users) {
        Show.find({}, function(err, shows) {
            console.log(req.session.passport.user);
            var user_shows = req.session.passport.user[0].shows;
            var user = req.session.passport.user[0];


            res.render('admin', {
                "shows" : shows.reverse(),
                "users" : users,
                "user_shows" : user_shows,
                "usr" : user
            });
        });
    });
});


router.get('/admin/stats', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    var db = req.db;
    User.find({}, function(err, users) {
        Show.find({}, function(err, shows) {
            console.log(req.session.passport.user);
            var user_shows = req.session.passport.user[0].shows;
            var user = req.session.passport.user[0];


            res.render('stats', {
                "shows" : shows.reverse(),
                "users" : users,
                "user_shows" : user_shows,
                "usr" : user
            });
        });
    });
});


module.exports = router;

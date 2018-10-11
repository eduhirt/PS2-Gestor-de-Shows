var express = require('express');
var router = express.Router();
var User = require('../models/showSchema.js');
var passport = require('passport');



/* TEMPLATES */

router.get('/', function(req, res) {
  res.render('show_index', { title: 'Shows' });
});

router.get('/register', function(req, res) {
  res.render('newshow', { });
});



/* FUNCIONALIDADES */

router.post('/register', function(req, res) {
  var db = req.db;
  var show = new Show({
    name: req.body.name,
    description: req.body.description,
    created_by: req.user,
    time: req.body.time,
    band: req.body.band,
    picture_url: req.body.picture_url,
    place_address: req.body.address,
    place_CEP: req.body.CEP,
    place_description: req.body.place_description,
    crowd_limit: req.body.crowd_limit
  });
  // call the built-in save method to save to the database
  show.save(function(err) {
    if (err) throw err;
    console.log('New show saved successfully!');
    res.redirect('/show');
  });
});

router.delete('/:id/delete', function(req,res) {
  Show.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Show deleted successfully!');
  })
})


router.put('/:showid/:usrid/buy', function(req,res){
  var show = Show.findByIdAndUpdate(req.params.showid, function(err,shw){
    show.bought.push(req.params.usrid);
  });
  var usr = User.findByIdAndUpdate(req.params.usrid, function(err, user){
    user.shows.push(req.params.showid);
  })
})


router.put('/:id/update', function(req, res){
  Show.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, show) {
    if (err) return next(err);
    res.send('Show udpated.');
  });
})


router.get('/get', function(req, res) {
  var shows = {};

  Show.find({}, function (err, user) {
      shows[show._id] = user;
  });

  res.send(users);
});


module.exports = router;
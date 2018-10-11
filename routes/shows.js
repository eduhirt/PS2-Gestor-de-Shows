var express = require('express');
var router = express.Router();
var Show = require('../models/showSchema.js');
var passport = require('passport');



/* TEMPLATES */

//Home page router
router.get('/', function(req, res) {
  //Salva todos os objetos show na variável shows
  var shows = {};
  Show.find({}, function (err, show) {
      shows[show._id] = show;
  });
  //Imprime a variável shows na tela
  res.send(shows);

  //res.render('show_index', { title: 'Shows' });
});

router.get('/register', function(req, res) {
  res.render('newshow', { });
});



/* FUNCIONALIDADES */

//Registro de eventos, chamar a função com todos os campos(req.body.*nome da variavel*) para registrar
router.post('/register', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
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

  show.save(function(err) {
    if (err) throw err;
    console.log('New show saved successfully!');
    res.redirect('/show');
  });
});


//Deleta show - usado em botões para chamar o url com o id do show a deletar
router.delete('/:id/delete', require('connect-ensure-login').ensureLoggedIn(), function(req,res) {
  Show.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Show deleted successfully!');
  })
})


//Compra ingresso para o show - Dá update nas variáveis bought(Show) e shows(User)
router.put('/:showid/:usrid/buy', require('connect-ensure-login').ensureLoggedIn(), function(req,res){
  var show = Show.findByIdAndUpdate(req.params.showid, function(err,shw){
    show.bought.push(req.params.usrid);
  });
  var usr = User.findByIdAndUpdate(req.params.usrid, function(err, user){
    user.shows.push(req.params.showid);
  })
})


//Update show - edita os campos selecionados do show  
router.put('/:id/update', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
  Show.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, show) {
    if (err) return next(err);
    res.send('Show udpated.');
  });
})


module.exports = router;
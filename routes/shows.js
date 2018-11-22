var express = require('express');
var router = express.Router();
var Show = require('../models/showSchema.js');
var passport = require('passport');
var User = require('../models/userSchema.js');



/* TEMPLATES */

//Home page router
router.get('/', function(req, res) {
  //Salva todos os objetos show na variável shows


  Show.find({}, function(err, shows) {
    console.log(shows);
    res.render('showlist', {
        "shows" : shows
    });
  });

  //res.render('show_index', { title: 'Shows' });
});

router.get('/register', function(req, res) {
  res.render('newshow', { });
});

router.get('/:id', function(req, res){
  Show.findById(req.params.id, function(err, show) {
    res.render('show_page', {
        "show" : show,
    });
  });
})

router.post('/search', function(req, res){
  var shows = [];
  Show.find({}, function(err, showsArray) {
    showsArray.forEach(show => {
      if(show.name != undefined){
        if (show.name.toLowerCase().includes(req.body.search.toLowerCase())){
          shows.push(show);
        }
      }
      if(show.description != undefined){
        if (show.description.toLowerCase().includes(req.body.search.toLowerCase())){
          shows.push(show);
        }
      }
      if(show.place != undefined){
        if (show.place.toLowerCase().includes(req.body.search.toLowerCase())){
          shows.push(show);
        }
      }
      if(show.band != undefined){
        if (show.band.toLowerCase().includes(req.body.search.toLowerCase())){
          shows.push(show);
        }
      }
      if(show.address_city != undefined){
        if (show.address_city.toLowerCase().includes(req.body.search.toLowerCase())){
          shows.push(show);
        }
      }
      if(show.address_state != undefined){
        if (show.address_state.toLowerCase().includes(req.body.search.toLowerCase())){
          shows.push(show);
        }
      }
      
    });
    var shows_filtered = [];
    shows.forEach(show => {
      if (!shows_filtered.includes(show)){
        console.log(shows_filtered);
        shows_filtered.push(show);
      }
    });

    res.render('index', {
      "shows" : shows_filtered.reverse(),
    });
  });
})



/* FUNCIONALIDADES */

//Registro de eventos, chamar a função com todos os campos(req.body.*nome da variavel*) para registrar
router.post('/register', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
  var db = req.db;
  var show = new Show({
    name: req.body.textinput,
    description: req.body.descricao,
    created_by: req.user.name,
    start: req.body.inicio + "T" + req.body.horaInicio,
    end: req.body.termino + "T" + req.body.horaTermino,
    band: req.body.banda,
    place: req.body.local,
    address: req.body.rua,
    address_number: req.body.numero,
    address_complement: req.body.complemento,
    address_neighborhood: req.body.bairro,
    address_city: req.body.cidade,
    address_CEP: req.body.cep,
    address_state: req.body.estado,
    crowd_limit: req.body.limit
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
router.post('/:id/buy', require('connect-ensure-login').ensureLoggedIn(), function(req,res){
  req.user.forEach(usr => {
    User.findById(usr._id, function(err, user){
      if (!user.shows.includes(req.params.id)){
        console.log("User:")
        user.shows.push(req.params.id);
        console.log(user)
        user.save();
      }
      else{
        console.log("user já cadastrado!")
      }
    })
    

    Show.findById(req.params.id, function(err,show){
      if (!show.bought.includes(usr._id)){
        show.bought.push(usr._id);
        show.save();
      }
      else{
        console.log("user já cadastrado!")
      }
      res.redirect("/show/"+req.params.id);
    });
  });
})


//Update show - edita os campos selecionados do show  
router.put('/:id/update', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
  Show.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, show) {
    if (err) return next(err);
    res.send('Show udpated.');
  });
})


module.exports = router;
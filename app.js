var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
var User = require('./models/userSchema');

// New Code
//CONEXÃO AO MONGODB
var mongoose = require('mongoose');
mongoose.connect('mongodb://eventop:eventop123@ds149672.mlab.com:49672/eventop', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("h");
});

//var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('eventop:eventop123@ds149672.mlab.com:49672/eventop');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var showsRouter = require('./routes/shows');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//AUTENTICAÇÃO
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
var Account = require('./models/userSchema');
passport.use(new LocalStrategy(
  function(username, password, cb) {
      User.find({username: username, password: password}, function(err, usr) {
        console.log(usr);
        return cb(null, usr);
    });
}));
  
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/show/', showsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
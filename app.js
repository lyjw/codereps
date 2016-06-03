var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jquery = require('jquery');
var config = require('./config/.oauth.js');
var mongoose = require("mongoose");
var passport = require('passport');
var githubAuth = require('./config/authentication');
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy = require('passport-github2').Strategy;

// models
var User = require('./models/user');

// routes
var routes = require('./routes/index');
var users = require('./routes/users');
var snippets = require('./routes/snippets');
var challenges = require('./routes/challenges');

// mongoose
var connection = mongoose.connect("mongodb://localhost/journal_prompter_4");

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/snippets', snippets);
app.use('/challenges', challenges);

passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  User.findById(id, function(err, user){
    console.log(user);
    if (!err) {
      done(null, user);
    } else {
      done(err, null);
    }
  });
});

// passport config
// var User = require('./models/user');
// require('./config/authentication');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// routes
app.get('/account', ensureAuthenticated, function(req, res){
  User.findById(req.session.passport.user, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render('/account', { user: user });
    }
  });
});

// OAuth Github
app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){});

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

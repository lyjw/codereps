var fs = require('fs');
var express = require('express');
var routes = require('../routes');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jquery = require('jquery');

var passport = require('passport');
var passportConfig = require('../config/passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var githubAuth = require('../config/authentication');
var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var bCrypt = require('bcrypt-nodejs');
var async = require('async');
var flash = require('connect-flash');

var React = require('react');
var ReactDOM = require('react-dom/server');

// models
var mongoose = require('mongoose');

// routes
var routes = require('../routes/index');
var users = require('../routes/users');
var reps = require('../routes/reps');
var challenges = require('../routes/challenges');
var packs = require('../routes/packs');
var authentications = require('../routes/authentications');

// mongoose
var connection = mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/journal_prompter_4");

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: false
}));

// require("node-jsx").install();

// view engine setup
app.set('../views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);
app.use('/users', users);
app.use('/reps', reps);
app.use('/challenges', challenges);
app.use('/packs', packs);
app.use('/auth', authentications);

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

var passport   = require('passport');
var mongoose  = require('mongoose');
var User       = require('../models/user');
var local       = require('./strategies/local');
var LocalStrategy = require('passport-local').Strategy;

exports = passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user);
});

exports = passport.deserializeUser(function(user, done) {
  User.findById( user._id , function(err, user){
    if (!err) {
      done(null, user);
    } else {
      done(err, null);
    }
  });
});

exports = passport.use('login', new LocalStrategy({ passReqToCallback: true },
  function(req, username, password, done) {
    User.findOne({ username: username },
      function(err, user) {
        if (err) { return done(err); }

        if (!user) {
          console.log("User Not Found: " + username);
          return done(null, false, req.flash('message', 'User Not Found'));
        }

        if (!user.validPassword(password)) {
          console.log("Invalid Password");
          return done(null, false, req.flash('message', 'Invalid Password'));
        }

        return done(null, user);
      }
    );
}));

exports = passport.use('signup', new LocalStrategy({ passReqToCallback: true }, function(req, username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }

      if (user) {
        console.log('User already exists.');
        return done(null, false, req.flash('message', 'User Already Exists'));
      } else {
        var user = new User();
        user.username = req.body.username;
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = user.generateHash(req.body.password);

        user.save(function(err, user) {
          if (err) {
            console.log('Error Saving User: ' + err);
            return done(err);
          } else {
            console.log('User Signup Successful');
            return done(null, user);
          }
        }); // close user.save
      } // close if/else
    }) // close User.findOne
}));

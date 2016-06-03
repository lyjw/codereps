var passport = require('passport');
var mongoose = require('mongoose');
var GithubStrategy = require('passport-github2').Strategy;
var User = require('../models/user');
var config = require('./.oauth.js');

module.exports = passport.use(new GithubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ oauthID: profile.id }, function(err, user) {
        if (err) {
          console.log(err);
        }

        if (!err && user !== null) {
          done(null, user);
        } else {
          var user = new User({
            oauthID: profile.id,
            username: profile.login,
            name: profile.name,
            email: profile.email
          });

          user.save(function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Saving User...");
              done(null, user);
            }
          });
        }
      }); // end of User.findOne
    }
  ));

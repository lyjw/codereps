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
            username: profile.username,
            name: profile.displayName,
            email: profile._json.email
          });

          user.save(function(err, user) {
            if (err) {
              console.log(err);
            } else {
              console.log("Saving User...");
              // Automatically calls passport.serializeUser()
              done(null, user, { more: "hello" });
            }
          });
        }
      }); // end of User.findOne
    }
  ));

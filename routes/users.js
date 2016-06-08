var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var passportConfig = require('../config/passport');
var challengeService = require('../helpers/challenge_service');

router.get('/login', function(req, res, next) {
  res.render('users/login', { errors: [] });
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/reps/new',
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.get('/signup', function(req, res, next) {
  res.render('users/signup', { errors: [] });
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/users/settings',
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.get('/settings', function(req, res, next) {
  res.render('users/settings', { errors: [] });
});

router.post('/settings', function(req, res, next) {
  var current_user = req.session.passport.user;

  User.findOneAndUpdate( { _id: current_user._id }, { languages: req.body.languages, experience: req.body.experience }, { new: true }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      challengeService.createChallengeRecords(user, function() {
        res.redirect('/reps/new');
      });
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

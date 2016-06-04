var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

router.get('/signup', function(req, res, next) {
  res.render('users/signup', { errors: [] });
});

router.post('/signup', function(req, res, next) {

  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User ({
    username:   req.body.username,
    name:       req.body.name,
    email:       req.body.email,
    experience:  req.body.experience,
    languages:  req.body.languages
  });

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
  });
});

router.get('/login', function(req, res, next) {
  res.render('users/login', { errors: [] });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

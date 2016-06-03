var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');


router.get('/signup', function(req, res, next) {
  res.render('users/register', { errors: [] });
});

router.post('/signup', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User ({
    username: req.body.username,
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    experience: req.body.experience,
    languages: req.body.languages,
  });

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
  });
});

// router.post('/login', function(req, res, next) {
//   if (!req.body.username || !req.body.password) {
//     return res.status(400).json({message: 'Please fill out all fields'});
//   }
//
//   passport.authenticate('local', function(err, user, info){
//     if (err) { return next(err); }
//
//     if (user) {
//       return res.json({token: user.generateJWT()});
//     } else {
//       return res.status(401).json(info);
//     }
//
//   })(req, res, next);
//
// });



//
// /* GET login page. */
//  router.get('/', function(req, res) {
//    // Display the Login page with any flash message, if any
//    res.render('users/index', { message: req.flash('message') });
//  });
//
//  /* Handle Login POST */
//  router.post('/login', passport.authenticate('login', {
//    successRedirect: '/home',
//    failureRedirect: '/',
//    failureFlash : true
//  }));
//
//  /* GET Registration Page */
//  router.get('/signup', function(req, res){
//    res.render('users/register',{message: req.flash('message')});
//  });
//
//  /* Handle Registration POST */
//  router.post('/signup', passport.authenticate('signup', {
//    successRedirect: '/home',
//    failureRedirect: '/signup',
//    failureFlash : true
//  }));
//
//
//
//
//


module.exports = router;

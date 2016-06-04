var express = require('express');
var router = express.Router();
var CodeChallenge = require('../models/codeChallenge');

router.get('/new', function(req, res, next) {
  res.render('challenges/new', { errors: [] });
});

router.get('/', function(req, res, next) {
  CodeChallenge.find({}, function(err, challenges) {
    if (err) {
      next(err);
    } else if (challenges) {
      res.render('challenges/index', { challenges: challenges });
    } else {
      next(new Error("Failed to load challenges."));
    }
  });
});

router.post("/", function(req, res, next) {
  var challenge = new CodeChallenge({
    language: req.body.language,
    level: req.body.level,
    description: req.body.description,
    prefill: req.body.prefill,
    test: req.body.test
  });

  console.log(challenge);

  challenge.save(function(err, challenge) {
    if (err) {
      res.render('challenges/new', { errors: err })
    } else {
      res.redirect('/challenges');
    }
  });
});

module.exports = router;

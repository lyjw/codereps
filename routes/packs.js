var express = require('express');
var router = express.Router();
var CodeChallenge = require('../models/codeChallenge');
var ChallengePack = require('../models/challengePack');
var auth = require('../config/abilities');

router.get('/new', auth.isAdmin, function(req, res, next) {
  res.render('packs/new', { errors: [] });
});

router.get('/', function(req, res, next) {
  ChallengePack.find({}, function(err, packs) {
    if (err) { next(err); }
    res.render('packs/index', { packs: packs });
  });
});

router.post("/", function(req, res, next) {
  var pack = new ChallengePack({
    name: req.body.name,
    language: req.body.language,
    level: req.body.level
  });

  console.log(pack);

  pack.save(function(err, challenge) {
    if (err) {
      res.render('packs/new', { errors: err })
    } else {
      res.redirect('/packs');
    }
  });
});

router.get('/:id', auth.isAdmin, function(req, res, next) {
  ChallengePack.findOne({ packId: req.params.id }, function(err, pack) {
    if (err) { next(err); }
    res.render('packs/show', { errors: [], challenges: pack.challenges })
  })
});


module.exports = router;

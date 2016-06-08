var express = require('express');
var router = express.Router();
var CodeChallenge = require('../models/codeChallenge');
var ChallengePack = require('../models/challengePack');
var helpers = require('../helpers/challenge_helpers');
var flash = require('connect-flash');
var auth = require('../config/abilities');

router.get('/new', auth.isAdmin, function(req, res, next) {
  ChallengePack.find({}, function(err, packs) {
    res.render('challenges/new', { errors: [], packs: packs });
  })
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
  helpers.assignPack(req.body.pack, function(pack) {
    var challenge = new CodeChallenge({
      _pack: pack._id,
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
        req.flash('pack_Id', challenge._pack);
        res.redirect('/packs/' + req.body.pack.packId);
      }
    });
  })
});

module.exports = router;

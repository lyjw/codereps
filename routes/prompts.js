var express = require('express');
var router = express.Router();
var Prompt = require('../models/prompt');

router.get('/new', function(req, res, next) {
  res.render('prompts/new', { errors: [] });
});

router.get('/', function(req, res, next) {
  Prompt.find({}, function(err, prompts) {
    if (err) {
      next(err);
    } else if (prompts) {
      res.render('prompts/index', { prompts: prompts });
    } else {
      next(new Error("Failed to load prompts."));
    }
  });
});

router.post("/", function(req, res, next) {
  var prompt = new Prompt({
    prompt: req.body.prompt,
    category: req.body.category
  });

  prompt.save(function(err, prompt) {
    if (err) {
      res.render('prompts/new', { errors: err })
    } else {
      res.redirect('/prompts');
    }
  });
});


module.exports = router;

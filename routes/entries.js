var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Prompt = require('../models/prompt');
var Entry = require('../models/entry');

router.get('/new', function(req, res, next) {
  var promise = Prompt.count({}).exec();

  promise.then(function(count) {
    console.log(count);
    console.log(Math.floor(Math.random() * count));
    return Math.floor(Math.random() * count);
  })
  .then(function(randomId) {
    Prompt.findOne({ _id: randomId }, function(err, prompt) {
      console.log(prompt);
      res.render('entries/new', { errors: [], prompt: prompt });
    });
  })
  .catch(function(err) {
    console.log('error:' + err);
  });
});

router.get('/', function(req, res, next) {
  Entry.find({}, function(err, entries) {
    if (err) {
      next(err);
    } else if (entries) {
      res.render('entries/index', { entries: entries });
    } else {
      next(new Error("Failed to load entries."));
    }
  });
});

router.post("/", function(req, res, next) {
  var entry = new Entry({
    prompt: req.body.prompt,
    body: req.body.body
  });

  entry.save(function(err, entry) {
    if (err) {
      res.render('entries/new', { errors: err.errors });
    } else {
      console.log(entry);
      res.redirect('/entries/');
    }
  });
});

router.get('/:id'), function(req, res) {
  console.log("HELLO");
  console.log(req.body);
  console.log(req.params.id);
  Entry.findOne({ _id: req.params.id }, function(err, entry) {
    console.log(entry);
    if (err) {
      res.end("Error");
    } else {
      res.render("entries/show", { entry : entry });
    }
  });
};

router.get('/', function(req, res, next) {
  Entry.find({}, function(err, entries) {
    if (err) {
      next(err);
    } else if (entries) {
      res.render('entries/index', { entries: entries });
    } else {
      next(new Error("Failed to load entries."));
    }
  });
});

module.exports = router;

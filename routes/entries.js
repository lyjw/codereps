var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Prompt = require('../models/prompt');
var Entry = require('../models/entry');

router.get('/new', function(req, res, next) {
  // Grab a random prompt
  Prompt.count().exec(function(err, count) {
    var random = Math.floor(Math.random() * count);

    var promise = Prompt.findOne({ _id: random }).exec();

    promise.then(function(prompt) {
      console.log(prompt);
      res.render(
        'entries/new',
        { errors: [], prompt: prompt }
      );
    });
  });
});

// router.get('/', function(req, res, next) {
//   Entry.find({}, function(err, entries) {
//     if (err) {
//       next(err);
//     } else if (entries) {
//       res.render('entries/index', { entries: entries });
//     } else {
//       next(new Error("Failed to load entries."));
//     }
//   });
// });

router.post("/", function(req, res, next) {
  var promise = Prompt.findOne({ _id: req.body.promptId }).exec();

  promise.then(function(prompt) {
    console.log(">>>>>>>>>>>>>>>>> PROMPT INSIDE PROMISE")
    console.log(prompt);
    console.log(">>>>>>>>>>>>>>>>> PROMPT ID INSIDE PROMISE")
    console.log(prompt._id);

    var entry = new Entry ({
      body: req.body.body
    });

    entry._prompt = prompt;

    console.log(">>>>>>>>>>>>>>>>> ENTRY RIGHT AFTER")
    console.log(entry._prompt.prompt);

    return entry;
  }).then(function(entry){
    console.log(">>>>>>>>>>>>>>>>> ENTRY AFTER THEN")
    console.log(entry);
    entry.save(function(err, entry) {
      if (err) {
        res.render('entries/new', { errors: err.errors });
      } else {
        console.log(">>>>>>>>>>>>>>>>> FINAL ENTRY")
        console.log(entry);
        res.redirect('/entries/');
      }
    });
  })

  // var prompt = Prompt.findOne({ _id: req.body.promptId }, function(err, prompt) {
  //   console.log(">>>>>>>>>>>>>>>>> PROMPT")
  //   console.log(prompt);
  //   return prompt;
  // });

  // var promptRes = new PromptResponse({
  //   prompt: prompt._id
  // });
  //
  // promptRes.entries.push({ body: req.body.body })

  // promptRes.save(function(err) {
  //   if (err) {
  //     res.render('entries/new', { errors: err.errors });
  //   } else {
  //     res.redirect('/entries/');
  //   }
  // });
  //
  // var entry = new Entry({
  //   _prompt: prompt._id,
  //   body: req.body.body
  // });

  // entry.save(function(err, entry) {
  //   if (err) {
  //     res.render('entries/new', { errors: err.errors });
  //   } else {
  //     console.log(">>>>>>>>>>>>>>>>> ENTRY")
  //     console.log(entry);
  //     res.redirect('/entries/');
  //   }
  // });
});

router.get('/:id'), function(req, res) {
  console.log("HELLO");
  console.log(req.body);
  console.log(req.params.id);
  Entry.findOne({ _id: req.params._id }, function(err, entry) {
    console.log(entry);
    if (err) {
      res.end("Error");
    } else {
      res.render("entries/show", { entry : entry });
    }
  });
};

router.get('/', function(req, res, next) {

  Entry.find({})
        .populate('_prompt')
        .exec(function(err, entries) {
          console.log(entries);
          res.render('entries/index', { entries: entries });
        });

  // Entry.find({}, function(err, entries) {
  //   if (err) {
  //     next(err);
  //   } else if (entries) {
  //     console.log(entries);
  //     // for (var i = 0; i < entries.length; i++) {
  //     //   Entry
  //     //     .findOne({ _id: entries[i]})
  //     // }
  //     //
  //     // Entry
  //     //   .findOne({ _id: entryId })
  //     //   .populate('_prompt')
  //     //   .exec(function (err, entry) {
  //     //     if (err) return handleError(err);
  //     //
  //     //     Prompt.findOne({ _id: })
  //     //
  //     //     console.log(entry);
  //     //   });
  //
  //
  //     res.render('entries/index', { entries: entries });
  //   } else {
  //     next(new Error("Failed to load entries."));
  //   }
  // });
});

module.exports = router;

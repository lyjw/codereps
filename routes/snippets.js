var express = require('express');
var router = express.Router();
var Challenge    = require('../models/codeChallenge');
var CodeSnippet  = require('../models/codeSnippet');
var helpers = require('helpers');
var path = require('path');
var child_process = require('child_process');


router.get('/new', function(req, res, next) {
  // Returns a random CodeChallenge
  Challenge.count().exec(function(err, count) {
    var random = Math.floor(Math.random() * count);

    var promise = Challenge.findOne({ challengeId: random }).exec();
    promise.then(function(challenge) {
      res.render( 'snippets/new', { errors: [], challenge: challenge });
    });
  });
});

router.post("/", function(req, res, next) {
  var promise = Challenge.findOne({ challengeId: req.body.challengeId }).exec();

  promise.then(function(challenge) {

    var snippet = new CodeSnippet({
      _challenge: challenge._id,
      input: req.body.input
    });

    return snippet;

  }).then(function(snippet) {

    snippet.save(function(err, snippet) {
      if (err) {
        console.log(err);
        res.render('snippets/new', { errors: err.errors });
      } else {
        return snippet;
      }
    });

    return snippet;

  }).then(function(snippet) {

    Challenge.findOne({ _id: snippet._challenge }, function(err, challenge) {
      helpers.generateSpecFile(req.body.input, challenge, function() {
        // Run test file
        var testDir = path.resolve(process.cwd() + '/temp');

        console.log(">>>>>>> TESTDIR");
        console.log(testDir);

        child_process.exec('jasmine inputSpec.js', { cwd: testDir }, function(err, stdout, strerr) {

          console.log(">>>>>>> ERR");
          console.log(err);
          console.log(">>>>>>> STRERR");
          console.log(strerr);
          // Update snippet to include test results
          CodeSnippet.findOneAndUpdate( { _id: snippet._id }, { result: stdout }, { new: true }, function(err, snippet) {
            if (err) {
              next(err);
            } else {
              res.redirect('/snippets/' + snippet._id);
            }
          });

        }); // end of child_process
      });
    });
  //
  //   console.log(">>>>>>>>>>> SNIPPET AFTER CREATING SPEC FILE")
  //   console.log(snippet);
  //
  //   return snippet;
  //
  // }).then(function(snippet) {


  }); // close then
});

router.get('/:id', function(req, res) {
  CodeSnippet.findOne({ _id: req.params.id }, function(err, snippet) {
    if (err) {
      res.end("Error");
    } else {
      res.render("snippets/show", { snippet : snippet });
    }
  });
});

router.get('/', function(req, res, next) {
  CodeSnippet.find({}, function(err, snippets) {
    if (err) {
      next(err);
    } else if (snippets) {
      res.render('snippets/index', { snippets: snippets });
    } else {
      next(new Error("Failed to load snippets."));
    }
  });
});

module.exports = router;

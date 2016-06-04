var express         = require('express');
var router          = express.Router();
var Challenge      = require('../models/codeChallenge');
var CodeSnippet    = require('../models/codeSnippet');
var helpers         = require('../helpers/snippet_helpers');
var auth            = require('../config/ensureAuthenticated');
var path            = require('path');
var child_process  = require('child_process');

// router.get('/new', ensureAuthenticated, function(req, res) {
router.get('/new', auth.ensureAuthenticated, function(req, res) {

  // Returns a random CodeChallenge
  Challenge.count().exec(function(err, count) {
    var random = Math.floor(Math.random() * count);

    var promise = Challenge.findOne({ challengeId: 1 }).exec();
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

        // TODO: Can possibly be a function - testInput function
        var testDir = path.resolve(process.cwd() + '/temp');

        // Run test file
        child_process.exec('jasmine inputSpec.js', { cwd: testDir }, function(err, stdout, strerr) {

          // Update snippet to include test results
          CodeSnippet.findOneAndUpdate( { _id: snippet._id }, { result: stdout, success: helpers.checkSuccess(stdout) }, { new: true }, function(err, snippet) {
            if (err) {
              console.log(err);
            } else {
              res.redirect('/snippets/' + snippet._id);
            }

            // TODO: Delete test file after evaluating
          });
        }); // end of child_process
      }); // end of generateSpecFile callback
    }); // end of Challenge.findOne
  }); // close then
});

router.get('/:id', function(req, res) {

  CodeSnippet
    .findOne({ _id: req.params.id })
    .populate('_challenge')
    .exec(function(err, snippet) {

      console.log(snippet);

      var message = snippet.result.split("\n")[6];
      console.log(message);


      if (err) {
        res.end("Error");
      } else {
        res.render("snippets/show", { snippet : snippet , message: message});
      }
    }
  );

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

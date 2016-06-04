var express         = require('express');
var router          = express.Router();
var Challenge      = require('../models/codeChallenge');
var CodeRep        = require('../models/codeRep');
var helpers         = require('../helpers/rep_helpers');
var auth            = require('../config/isLoggedIn');
var path            = require('path');
var child_process  = require('child_process');

// router.get('/new', ensureAuthenticated, function(req, res) {
router.get('/new', auth.isLoggedIn, function(req, res) {
  console.log(">>>>>>>>>>>>>> CURRENT USER");
  console.log(req.session.passport);

  // Returns a random CodeChallenge
  Challenge.count().exec(function(err, count) {
    var random = Math.floor(Math.random() * count);

    var promise = Challenge.findOne({ challengeId: random }).exec();
    promise.then(function(challenge) {
      res.render( 'reps/new', { errors: [], challenge: challenge });
    });

  });
});

router.post("/", function(req, res, next) {
  var promise = Challenge.findOne({ challengeId: req.body.challengeId }).exec();

  promise.then(function(challenge) {

    var rep = new CodeRep({
      _challenge: challenge._id,
      input: req.body.input
    });

    return rep;

  }).then(function(rep) {

    rep.save(function(err, rep) {
      if (err) {
        console.log(err);
        res.render('reps/new', { errors: err.errors });
      } else {
        return rep;
      }
    });

    return rep;

  }).then(function(rep) {

    Challenge.findOne({ _id: rep._challenge }, function(err, challenge) {
      helpers.generateSpecFile(req.body.input, challenge, function() {

        // TODO: Can possibly be a function - testInput function
        var testDir = path.resolve(process.cwd() + '/temp');

        // Run test file
        child_process.exec('jasmine inputSpec.js', { cwd: testDir }, function(err, stdout, strerr) {

          // Update rep to include test results
          CodeRep.findOneAndUpdate( { _id: rep._id }, { result: stdout, success: helpers.checkSuccess(stdout) }, { new: true }, function(err, rep) {
            if (err) {
              console.log(err);
            } else {
              res.redirect('/reps/' + rep._id);
            }

            // TODO: Delete test file after evaluating
          });
        }); // end of child_process
      }); // end of generateSpecFile callback
    }); // end of Challenge.findOne
  }); // close then
});

router.get('/:id', function(req, res) {

  CodeRep
    .findOne({ _id: req.params.id })
    .populate('_challenge')
    .exec(function(err, rep) {

      console.log(rep);

      var message = rep.result.split("\n")[6];
      console.log(message);


      if (err) {
        res.end("Error");
      } else {
        res.render("reps/show", { rep : rep , message: message});
      }
    }
  );

});

router.get('/', function(req, res, next) {
  CodeRep.find({}, function(err, reps) {
    if (err) {
      next(err);
    } else if (reps) {
      res.render('reps/index', { reps: reps });
    } else {
      next(new Error("Failed to load reps."));
    }
  });
});

module.exports = router;

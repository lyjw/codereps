var express = require('express');
var router = express.Router();
var Challenge = require('../models/codeChallenge');
var User = require('../models/user');
var ChallengeRecord = require('../models/challengeRecord');
var CodeRep = require('../models/codeRep');
var StreakCounter = require('../models/streakCounter');
var helpers = require('../helpers/rep_helpers');
var userHelpers = require('../helpers/user_helpers');
var challengeService = require('../helpers/challenge_service');
var auth = require('../config/abilities');
var flash = require('connect-flash');
var moment = require('moment');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Panel = require('../server/generated/panel').default;

router.get('/new', auth.isLoggedIn, function(req, res) {
  userHelpers.findCurrentUser(req.session.passport, function(user) {
    var reactHtml = ReactDOMServer.renderToString(React.createElement(Panel, { user: user }));

    console.log(">>>>>>> CURRENT USER");
    console.log(user);

    // Returns a random CodeChallenge from ChallengeRecords
     challengeService.findRecord(user, function(record) {
       ChallengeRecord
         .findOne({ _id: record._id })
         .populate('_challenge')
         .exec(function(err, record) {

           if (err) {
             res.end("Error");
           } else {
             res.render( 'reps/new', { errors: [], challenge: record._challenge, user: user, reactOutput: reactHtml });
           }
         });
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
        helpers.testInput(rep, function(rep) {
          userHelpers.findCurrentUser(req.session.passport, function(user) {
            userHelpers.updateStats(user, function() {
              req.flash('rep_ID', rep._id)
              res.redirect('/reps/result');
            });
          });
        })
      });
    });
  }).catch(console.log.bind(console));
});

router.get('/result', function(req, res) {
  userHelpers.findCurrentUser(req.session.passport, function(user) {
    var reactHtml = ReactDOMServer.renderToString(React.createElement(Panel, { user: user }));
    console.log(reactHtml);

    CodeRep
      .findOne({ _id: req.flash('rep_ID') })
      .populate('_challenge')
      .exec(function(err, rep) {
        if (err) {
          res.end("Error");
        } else {
          res.render("reps/result", { rep : rep, user: user, reactOutput: reactHtml } );
        }
      }
    );
  });
});

router.post('/result', function(req, res) {
  var promise = User.findOne({ userId: req.session.passport.user.userId }).exec();

  promise.then(function(user) {
    challengeService.calculateGravity(req.body.difficulty, function(gravity) {

      CodeRep.findOne({ repId: req.body.repID }, function(err, rep) {
        if (err) { next(err); }

        // Update User's Challenge Record with the new gravity and other stats
        ChallengeRecord
          .findOne({})
          .where('_id').in(user.challengeRecords)
          .where('_challenge', rep._challenge)
          .exec(function(err, record) {
            challengeService.updateRecord(record, gravity, rep, function() {
              req.flash('record_ID', record._id);
              // res.redirect("/reps/stats");
              res.redirect("/reps/new");
            });
          });
      });
    });
  });
});

router.get('/stats', function(req, res) {
  ChallengeRecord.findById(req.flash('record_ID'), function(err, record) {
    if (err) {
      res.end("Error");
    } else {
      res.render("reps/stats", { record : record });
    }
  });
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

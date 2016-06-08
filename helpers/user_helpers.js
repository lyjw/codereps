var User = require('../models/user');
var StreakCounter = require('../models/streakCounter');
var moment = require('moment');
var async = require('async');

exports.findCurrentUser = function(session, callback) {
  User.findOne({ _id: session.user._id }, function(err, user) {
    if (err) { next(err); }
    callback(user);
  });
}

var updateRepCount = function(user, callback) {
  User.findOneAndUpdate(
    { _id: user._id },
    { $inc: { repsCompleted: 1 }},
    { new: true },
    function(err, user) {
      callback(user);
    }
  );
}

var createStreakCounter = function(user) {
  StreakCounter
    .findOne({ _user: user._id })
    .where({ createdOn: moment().format('DD-MM-YYYY') })
    .exec(function(err, counter) {
      if (counter === null) {
        StreakCounter.create({ _user: user._id }, function(err, counter) {
          if (err) { next(err); }
        });
      }
  });
}

var resetStreakCounter = function(user, callback) {
  User.findOneAndUpdate(
    { _id: user._id },
    { $set: { streakCount: [] } },
    { new: true },
    function(err, user) {
      console.log(user.streakCount);
      callback(user);
    }
  );
}

var updateStreak = function(user, callback) {
  if ((!user.hasStreakCounterToday()) && user.hasStreakCounterYesterday()) {
    createStreakCounter(user);
  } else if ((!user.hasStreakCounterToday()) && (!user.hasStreakCounterYesterday())) {
    resetStreakCounter(user, function(user) {
      createStreakCounter(user);
    });
  } else {
  }

  callback(user);
}

exports.updateStats = function(user, callback) {
  updateRepCount(user, function(user) {
    updateStreak(user, function() {
      callback();
    })
  });
}

var mongoose = require('mongoose');
var User = require("../models/user");
var CodeChallenge = require("../models/codeChallenge");
var ChallengeRecord = require("../models/challengeRecord");

exports.createChallengeRecords = function(user, callback) {
  var stream = CodeChallenge
                  .where('language').in(user.languages)
                  .where('level', user.experience)
                  .stream();

  stream.on("data", function(challenge) {
    stream.pause();

    console.log(">>> INSIDE STREAM - CHALLENGE");
    console.log(challenge);

    var record =  {
      _user: user._id,
      _challenge: challenge._id
    }

    ChallengeRecord.create(record, function(err, record) {
      if (err) { console.log(err); }

      console.log(">>>>>>>>>> RECORD CREATED");
      console.log(record);

      stream.resume();
    });

  });

  stream.on("error", function(err) {
    console.log(err);
  });

  stream.on("end", function() {
    console.log("ALL RECORDS CREATED");
    callback();
  })
}

exports.createChallengeRecordsByPack = function(user, packs, callback) {
  var stream = CodeChallenge
                  .where('_pack').in(packs)
                  .stream();

  stream.on("data", function(challenge) {
    stream.pause();

    var record =  {
      _user: user._id,
      _challenge: challenge._id
    }

    ChallengeRecord.create(record, function(err, record) {
      if (err) { console.log(err); }

      console.log(">>>>>>>>>> RECORD CREATED");
      console.log(record);

      stream.resume();
    });

  });

  stream.on("error", function(err) {
    console.log(err);
  });

  stream.on("end", function() {
    console.log("ALL RECORDS CREATED");
    callback();
  })
}

exports.findRecord = function(user, callback) {
  ChallengeRecord
    .find({})
    .where('_user', user._id)
    .sort({ gravity: 1 })
    .exec(function(err, records) {

      // Returns a list of ChallengeRecords that belong to the user
      // Records are sorted by gravity, ascending
      // Return the lowest record with the lowest gravity
      callback(records[0]);
    }
  );
}

exports.calculateGravity = function(difficulty, callback) {
  var gravities = {
    'veasy': 9,
    'easy': 7,
    'normal': 5,
    'challenging': 3,
    'vchallenging': 2
  }

  callback(gravities[difficulty]);
}

exports.updateRecord = function(record, gravity, rep, callback) {
  console.log(">>>>>>> INSIDE UPDATE RECORD");
  console.log(record);

  ChallengeRecord.findOneAndUpdate(
    { _id: record._id },
    { gravity: gravity,
      $inc: { attempts: 1, success_attempts: rep.success ? 1 : 0 }
    }, { new: true }, function(err, record) {
      if (err) { console.log(err); }

        console.log(">>>>>>>>> UPDATED CHALLENGE RECORD");
        console.log(record);

        callback(record);
      }
  );
}

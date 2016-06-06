var mongoose = require('mongoose');
var User = require("../models/user");
var CodeChallenge = require("../models/codeChallenge");
var ChallengeRecord = require("../models/challengeRecord");
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);
var async = require('async')


exports.createChallengeRecords = function(user, callback) {

  var stream = CodeChallenge
                  .where('language').in(user.languages)
                  .where('level', user.experience)
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

      User.findByIdAndUpdate(
        record._user,
        { $push: { "challengeRecords": record } },
        { new: true },
        function(err, user) {
          console.log(">>>>>> USER INSIDE FIND AND UPDATE")
          console.log(user);
          if (err) { next(err); }
      });

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

  // CodeChallenge
  //   .where('language').in(user.languages)
  //   .where('level', user.experience)
  //   .exec( function(err, challenges) {
  //
  //     for (var i = 0; i < challenges.length; i++) {
  //
  //       var record =  {
  //         _user: user._id,
  //         _challenge: challenges[i]._id
  //       }
  //
  //       ChallengeRecord.create( record, function(err, record) {
  //         if (err) { next(err); }
  //       });
  //     };
  // });
  //
  // callback();

  // ----

  // CodeChallenge
  //   .where('language')
  //   .in(user.languages)
  //   .where('level', user.experience)
  //   .exec(function(err, challenges) {
  //     if (err) { next(err); }
  //
  //     async.waterfall([
  //       function(callback) {
  //         console.log(">>>>>>> STEP 1 OF WATERFALL");
  //         var records = [];
  //
  //         for (var i = 0; i < challenges.length; i++) {
  //           // Create a new ChallengeRecord
  //           var record =  new ChallengeRecord({
  //             _user: user._id,
  //             _challenge: challenges[i]._id
  //           });
  //
  //           records.push(record);
  //         }
  //
  //         callback(null, records);
  //       },
  //       function(records, callback) {
  //         console.log(">>>>>>>>> STEP 2 OF WATERFALL");
  //
  //         async.each(records, function(record, callback) {
  //           record.save(function(err, record) {
  //             if (err) {
  //               return done(err);
  //             } else {
  //               console.log(">>>>>>>>>>>> RECORD SAVED");
  //               console.log(record);
  //
  //               User.findByIdAndUpdate(
  //                 user._id,
  //                 {$push: { "challengeRecords": record }},
  //                 { new: true },
  //                 function(err, user) {
  //                   if (err) { next(err); }
  //               });
  //             }
  //           });
  //         });
  //
  //         callback(null, 'three');
  //       },
  //     ], function (err, result) {
  //       console.log(">>>>>>> DONE!");
  //     });
  //   });

    // callback();

  // var promise =  CodeChallenge
  //   .where('language')
  //   .in(user.languages)
  //   .where('level', user.experience).exec();
  //
  // promise.then(function(challenges) {
  //   return Promise.all(challenges.map(function(challenge) {
  //
  //     var record =  new ChallengeRecord({
  //       _user: user._id,
  //       _challenge: challenge._id
  //     });
  //
  //     record.save().then(function(record) {
  //       console.log(">>>>> THIS RECORD HAS BEEN SAVED");
  //       console.log(record);
  //     });
  //
  //     console.log(">>>>> BEFORE THEN");
  //     console.log(record);
  //
  //     return record;
  //   }));
  // }).then(function(records) {
  //   console.log(">>>>>>>>>>> HERE I AM IN RESULTS");
  //   console.log(records);
    //
    // return Promise.all(records.map(function(record) {
    //   record.save(function(err, record) {
    //    if (err) {
    //      return done(err);
    //    } else {
    //      console.log(">>>>>>>>>>>> THIS IS A RECORD");
    //      console.log(record);
    //
    //     //  User.findByIdAndUpdate(
    //     //    user._id,
    //     //    {$push: { "challengeRecords": record }},
    //     //    { new: true },
    //     //    function(err, user) {
    //     //      if (err) { next(err); }
    //     //  });
    //    }
    //  });
    // }));
  // }).then(function(over){
  //   console.log(">>>>>>>>>> OVER");
  // });

  // CodeChallenge
  //   .where('language').in(user.languages)
  //   .where('level', user.experience)
  //   .exec( function(err, challenges) {
  //
  //     // Create a Challenge Record for each Challenge that meets the settings
  //     for (var i = 0; i < challenges.length; i++) {
  //
  //       var record =  new ChallengeRecord({
  //         _user: user._id,
  //         _challenge: challenges[i]._id
  //       });
  //
  //       // Save record and push a copy into user's challenge records
  //       record.save(function(err, record) {
  //         if (err) {
  //           return done(err);
  //         } else {
  //           console.log(">>>>>>>>>>>> THIS IS A RECORD");
  //           console.log(record);
  //
  //           User.findByIdAndUpdate(
  //             user._id,
  //             {$push: { "challengeRecords": record }},
  //             { new: true },
  //             function(err, user) {
  //               if (err) { next(err); }
  //           });
  //         }
  //       });
  //     }
  //
  //     console.log(">>>> FINISHED CREATING CHALLENGE RECORDS");
  //     console.log(">>>> SHOW USER");
  //     console.log(user);
  // });
}

exports.findRecord = function(user, callback) {
  console.log(">>>>>>>>>>> INSIDE FIND RECORD");
  console.log(user.challengeRecords.sort({ gravity: -1 }));
  callback(user.challengeRecords.sort({ gravity: -1 })[0]);
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

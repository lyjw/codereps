var User = require('../models/user');

exports.updateRepCount = function(user, callback) {
  User.findOneAndUpdate(
    { _id: user._id },
    { $inc: { repsCompleted: 1 }},
    { new: true },
    function(err, user) {
      console.log(">>>>>>>>> USER REP COUNT UPDATED");
      console.log(user);
    }
  );

  callback();
}

exports.findCurrentUser = function(session, callback) {
  console.log(">>>>>>>> WHAT DID I PASS");
  console.log(session);

  User.findOne({ userId: session.user.userId }, function(err, user) {
    console.log(">>>>>>>> USER");
    console.log(user);
    if (err) { next(err); }
    callback(user);
  });
}

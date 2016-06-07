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

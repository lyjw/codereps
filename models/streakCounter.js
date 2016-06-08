var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var User         = require('../models/user');
var moment      = require('moment');

var StreakCounterSchema = new Schema({
  _user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdOn:   { type: String, default: moment().format("DD-MM-YYYY") }
});

StreakCounterSchema.post('save', function(counter, next) {
  User.findByIdAndUpdate(
    counter._user,
    { $push: { "streakCount": counter } },
    { new: true },
    function(err, user) {
      if (err) { next(err); }
      next();
    }
  );
});


module.exports = mongoose.model("StreakCounter", StreakCounterSchema);

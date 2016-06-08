var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var bcrypt           = require('bcrypt-nodejs');
var autoIncrement   = require('mongoose-auto-increment');
var moment          = require('moment');

autoIncrement.initialize(mongoose);

var UserSchema = new Schema ({
  username:   { type: String, trim: true },
  name:       { type: String, trim: true },
  oauthID:    Number,
  email:       { type: String, trim: true },
  password:   String,
  experience:  String,
  languages:  [],
  challengeRecords: [],
  streakCount: [],
  repsCompleted: { type: Number, default: 0 },
  role:        { type: String, default: 'user' },
  createdOn:  { type: Date, default: Date.now }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.hasStreakCounterToday = function() {
  console.log(">>>>>>>>> INSIDE HASSTREAKCOUNTERTODAY")
  for(var i = 0; i < this.streakCount.length; i++) {
    if (this.streakCount[i].createdOn === moment().format("DD-MM-YYYY")) {
      console.log(">>>>> A STREAK COUNTER EXISTS FOR TODAY");
      return true;
      break;
    } else {
      return false;
    }
  }
};

UserSchema.methods.hasStreakCounterYesterday = function() {
  console.log(">>>>>>>>> INSIDE HASSTREAKCOUNTERYESTERDAY")
  for(var i = 0; i < this.streakCount.length; i++) {
    if (this.streakCount[i].createdOn === moment().subtract(1, 'days').format("DD-MM-YYYY")) {
      console.log(">>>>> A STREAK COUNTER EXISTS FOR YESTERDAY");
      return true;
      break;
    } else {
      return false;
    }
  }
};

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId' });
module.exports = mongoose.model("User", UserSchema);

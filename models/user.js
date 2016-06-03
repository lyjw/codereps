var mongoose                = require('mongoose');
var Schema                  = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');
var crypto                    = require('crypto');
var autoIncrement           = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var UserSchema = new Schema ({
  username:   { type: String, trim: true },
  name:       { type: String, trim: true },
  oauthID:    { type: Number },
  email:       { type: String, trim: true },
  hash:        { type: String },
  salt:         { type: String },
  experience:  { type: String },
  languages:  { type: Array },
  challengeRecords: {},
  createdOn:  { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64).toString('hex');
  }

  next();
});

UserSchema.methods.authenticate = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 100, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({ username: possibleUsername }, function(err, user) {
      if (!err) {
        if (!user) {
          callback(possibleUsername);
        } else {
          return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
        }
      } else {
        callback(null);
      }
    }
  ); // end of findOne
};


//
// UserSchema.methods.generateJWT = function() {
//   var today = new Date();
//   var exp = new Date(today);
//   exp.setDate(today.getDate() + 60);
//
//   return jwt.sign({
//     _id: this._id,
//     username: this.username,
//     exp: parseInt(exp.getTime() / 1000),
//   }, ENV["jwt_secret"]);
// };

// UserSchema.plugin(passportLoginMongoose);
UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId' });
module.exports = mongoose.model("User", UserSchema);

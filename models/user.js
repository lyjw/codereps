var mongoose                = require('mongoose');
var Schema                  = mongoose.Schema;
var bcrypt                   = require('bcrypt-nodejs');
var autoIncrement           = require('mongoose-auto-increment');

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
  role:        { type: String, default: 'user' },
  createdOn:  { type: Date, default: Date.now }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId' });
module.exports = mongoose.model("User", UserSchema);

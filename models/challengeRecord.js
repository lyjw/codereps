var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;
var Challenge       = require('../models/codeChallenge');
var User             = require('../models/user');
var autoIncrement  = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var ChallengeRecordSchema = new Schema({
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  _challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'CodeChallenge' },
  attempts: { type: Number, default: 0 },
  success_attempts: { type: Number, default: 0 },
  gravity: { type: Number, default: 1 },
  status: { type: String, default: 'active' },
  createdOn: { type: Date, default: Date.now },
});

CodeChallengeSchema.plugin(autoIncrement.plugin, { model: 'CodeChallenge', field: 'challengeId' });
module.exports = mongoose.model("CodeChallenge", CodeChallengeSchema);

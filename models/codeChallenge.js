var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ChallengePack = require('../models/challengePack');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var CodeChallengeSchema = new Schema({
  language:   { type: String },
  level:        { type: String },
  description: { type: String, trim: true, required: true},
  prefill:      { type: String, trim: true },
  test:         { type: String, required: true },
  _pack:       Number
});

CodeChallengeSchema.post('save', function(challenge, next) {
  ChallengePack.findOneAndUpdate(
    { packId: challenge._pack },
    { $push: { "challenges": challenge } },
    { new: true },
    function(err, user) {
      if (err) { next(err); }
      next();
    }
  );
});

CodeChallengeSchema.plugin(autoIncrement.plugin, { model: 'CodeChallenge', field: 'challengeId' });
module.exports = mongoose.model("CodeChallenge", CodeChallengeSchema);

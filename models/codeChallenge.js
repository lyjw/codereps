var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var CodeChallengeSchema = new Schema({
  language:   { type: String },
  level:        { type: String },
  description: { type: String, trim: true, required: true},
  prefill:      { type: String, trim: true },
  test:         { type: String, required: true }
});

CodeChallengeSchema.plugin(autoIncrement.plugin, { model: 'CodeChallenge', field: 'challengeId' });
module.exports = mongoose.model("CodeChallenge", CodeChallengeSchema);

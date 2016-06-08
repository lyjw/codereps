var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var ChallengePackSchema = new Schema({
  name:       String,
  language:   String,
  level:        String,
  challenges: []
});

ChallengePackSchema.plugin(autoIncrement.plugin, { model: 'ChallengePack', field: 'packId' });
module.exports = mongoose.model("ChallengePack", ChallengePackSchema);

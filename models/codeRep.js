var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var Challenge    = require('../models/codeChallenge');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var CodeRepSchema = new Schema({
  _challenge:  { type: mongoose.Schema.Types.ObjectId, ref: 'CodeChallenge' },
  input:        { type: String, trim: true, required: true},
  created:     { type: Date, default: Date.now },
  result:       { type: String, trim: true },
  success:     { type: Boolean },
  difficulty:   { type: String }
});

CodeRepSchema.plugin(autoIncrement.plugin, { model: 'CodeRep', field: 'repId' });
module.exports = mongoose.model("CodeRep", CodeRepSchema);

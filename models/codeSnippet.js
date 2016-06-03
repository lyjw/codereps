var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var Challenge    = require('../models/codeChallenge');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var CodeSnippetSchema = new Schema({
  _challenge:  { type: mongoose.Schema.Types.ObjectId, ref: 'CodeChallenge' },
  input:        { type: String, trim: true, required: true},
  created:     { type: Date, default: Date.now },
  result:       { type: String, trim: true },
  success:      { type: Boolean },
  difficulty:   { type: String }
});

CodeSnippetSchema.plugin(autoIncrement.plugin, { model: 'CodeSnippet', field: 'snippetId' });
module.exports = mongoose.model("CodeSnippet", CodeSnippetSchema);

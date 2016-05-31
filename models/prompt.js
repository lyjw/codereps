var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var PromptSchema = new Schema({
  prompt:     { type: String, trim: true, required: true},
  category:   { type: String }
});

PromptSchema.plugin(autoIncrement.plugin, 'Prompt');
module.exports = mongoose.model("Prompt", PromptSchema);

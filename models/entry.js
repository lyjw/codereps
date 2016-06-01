var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Prompt    = require('../models/prompt');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var EntrySchema = new Schema({
  _prompt:    { type: mongoose.Schema.Types.ObjectId,
                  ref: 'Prompt'
                },
  body:        { type: String, trim: true, required: true},
  created:    { type: Date, default: Date.now }
});

EntrySchema.plugin(autoIncrement.plugin, 'Entry');
module.exports = mongoose.model('Entry', EntrySchema);

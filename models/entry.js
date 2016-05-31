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

// EntrySchema.methods.findPrompt = function(promptId) {
//   // var promise = Prompt.findOne({ _id: promptId }).exec();
//   //
//   // promise.then(function(prompt) {
//   //   console.log(prompt.prompt);
//   //   if (prompt !== null) {
//   //     res.return(prompt.prompt);
//   //   }
//   // // Prompt.findOne({ _id: promptId }, function(err, prompt){
//   // //   if (prompt !== null) {
//   // //     var promptBody = prompt.prompt;
//   // //     console.log(prompt.prompt);
//   // //   }
//   // });
//   this.model('Entry')
//     .findOne({ _id: entryId })
//     .populate('_prompt')
//     .exec(function (err, entry) {
//       if (err) return handleError(err);
//
//       Prompt.findOne({ _id: })
//
//       console.log(entry);
//     });
// }

EntrySchema.plugin(autoIncrement.plugin, 'Entry');
module.exports = mongoose.model('Entry', EntrySchema);

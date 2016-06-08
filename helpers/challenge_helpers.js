var Challenge = require('../models/codeChallenge');
var ChallengePack = require('../models/challengePack');

exports.assignPack = function(name, callback) {
  ChallengePack.findOne({ name: name }, function(err, pack) {
    if (err) { next(err); }
    callback(pack);
  });
}

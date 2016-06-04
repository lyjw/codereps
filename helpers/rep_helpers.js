exports.generateSpecFile = function(userInput, challenge, callback) {
  var fs = require('fs');
  var path = require('path');

  var testFile = userInput + '\n' + challenge.test;

  // Create the spec file
  fs.writeFile('./temp/inputSpec.js', testFile, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Spec File created.');

    callback();
  });
}

exports.checkSuccess = function(stdout) {
  var testRegex = /\b(0 failures)\b/g;
  return testRegex.test(stdout);
}

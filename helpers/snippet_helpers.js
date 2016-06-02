exports.generateSpecFile = function(userInput, challenge, callback) {
  var fs = require('fs');
  var path = require('path');

  // Compile user input and challenge tests into a single spec file
  var data = fs.readFileSync('./temp/specTemplate.js').toString().split('\n');
  data[1] = userInput;
  var content = data.join("\n");

  var testFile = content + '\n' + challenge.test;

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

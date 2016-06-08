var path            = require('path');
var fs              = require('fs');
var child_process  = require('child_process');
var CodeRep        = require('../models/codeRep');

exports.generateSpecFile = function(userInput, challenge, callback) {
  var testFile = userInput + '\n' + challenge.test;

  fs.writeFile('./temp/inputSpec.js', testFile, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Spec File created.');

    callback();
  });
}

var checkSuccess = function(stdout) {
  var testRegex = /\b(0 failures)\b/g;
  return testRegex.test(stdout);
}

var formatTestOutput = function(stdout) {
  var startOfErr = stdout.indexOf("Failures");
  var startOfStackErr = stdout.indexOf("Stack");
  var endOfStackErr = stdout.indexOf("spec");
  var startOfMessage = stdout.indexOf("Message");

  return stdout.slice(startOfErr, startOfMessage) + "\n" + stdout.slice(startOfMessage, startOfStackErr) + "\n" + stdout.slice(endOfStackErr - 2, -1);
}

exports.testInput = function(rep, callback) {
  var testDir = path.resolve(process.cwd() + '/temp');

  // Run test file
  child_process.exec('jasmine inputSpec.js', { cwd: testDir }, function(err, stdout, strerr) {

    var formattedTestResult = formatTestOutput(stdout);

    // Update rep to include test results
    CodeRep.findOneAndUpdate(
      { _id: rep._id },
      { result: formattedTestResult, success: checkSuccess(stdout) },
      { new: true },
      function(err, rep) {
        if (err) {
          console.log(err);
        } else {
          callback(rep);
        }
        // TODO: Delete test file after evaluating
    });
  }); // end of child_process
}

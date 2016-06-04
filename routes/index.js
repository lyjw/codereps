var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(">>>>>>>>>>>>>> INSIDE THE INDEX PAGE");
  console.log(req.session.passport);

  res.render('index', { title: 'CodeReps', currentSession: req.session.passport });
});

module.exports = router;

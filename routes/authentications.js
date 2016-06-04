var express = require('express');
var router = express.Router();
var passport = require('passport');

// OAuth Github
router.get('/github',
  passport.authenticate('github'), function(req, res){});

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res, err) {
    console.log(">>>>>>>>>>REQ")
    console.log(req.session);
    res.redirect('/');
  });

module.exports = router;

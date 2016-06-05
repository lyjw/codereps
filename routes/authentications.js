var express = require('express');
var router = express.Router();
var passport = require('passport');

// OAuth Github
router.get('/github',
  passport.authenticate('github'), function(req, res){});

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res, err) {
    console.log(">>>>>>>> CHECK EXPERIENCE");
    console.log(req.session.passport.user.experience);
    console.log(">>>>>>>> CHECK EXPERIENCE TRUE OR FALSE");
    console.log(req.session.passport.user.experience === undefined);

    if (req.session.passport.user.experience === undefined) {
      res.redirect("/users/settings");
    } else {
      res.redirect("/reps/new");
    }
  });

module.exports = router;

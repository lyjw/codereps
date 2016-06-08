var helpers = require('../helpers/user_helpers');

// Middleware to ensure user is authenticated
exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/users/signup');
};

exports.isAdmin = function(req, res, next) {
  helpers.findCurrentUser(req.session.passport, function(user) {
    if (user.role === 'admin') {
      return next();
    }

    res.redirect('/users/login');
  });
};

// Middleware to ensure user is authenticated
exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/users/signup');
};

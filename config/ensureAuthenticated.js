// Middleware to ensure user is authenticated
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/users/signup');
};

// middleware/auth.js
function requireLogin(req, res, next) {
    if (req.session.isLoggedIn) {
      next(); // User is logged in, proceed to route
    } else {
      res.redirect('/login'); // User is not logged in, redirect to login
    }
  }
  
  module.exports = { requireLogin };
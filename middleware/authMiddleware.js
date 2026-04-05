const User = require('../models/User');

const attachUser = async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  try {
    const user = await User.findById(req.session.user._id).select('-password');
    req.user = user;
    res.locals.currentUser = user;
    next();
  } catch (error) {
    next(error);
  }
};

const ensureAuth = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error_msg', 'Please login to continue.');
    return res.redirect('/login');
  }
  next();
};

const ensureAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    req.flash('error_msg', 'Admin access required.');
    return res.redirect('/hotels');
  }
  next();
};

module.exports = { attachUser, ensureAuth, ensureAdmin };

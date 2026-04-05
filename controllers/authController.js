const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getSignupPage = (req, res) => {
  res.render('auth/signup', { title: 'Signup' });
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      req.flash('error_msg', 'All fields are required.');
      return res.redirect('/signup');
    }

    if (password.length < 6) {
      req.flash('error_msg', 'Password must be at least 6 characters long.');
      return res.redirect('/signup');
    }

    if (password !== confirmPassword) {
      req.flash('error_msg', 'Passwords do not match.');
      return res.redirect('/signup');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error_msg', 'Email is already registered.');
      return res.redirect('/signup');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    req.flash('success_msg', 'Signup successful. Please login.');
    return res.redirect('/login');
  } catch (error) {
    next(error);
  }
};

exports.getLoginPage = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash('error_msg', 'Email and password are required.');
      return res.redirect('/login');
    }

    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error_msg', 'Invalid credentials.');
      return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error_msg', 'Invalid credentials.');
      return res.redirect('/login');
    }

    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    req.flash('success_msg', `Welcome back, ${user.name}!`);
    return res.redirect('/hotels');
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

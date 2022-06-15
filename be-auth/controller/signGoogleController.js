const express = require('express');
const router = express.Router();

require('dotenv').config();

// ---

const googleStrategy = require('../middleware/googleStrategy');

router.get('/google/login', (req, res) => {
  // res.render('auth/login');
  res.status(200).json({ code: 200, message: '/login 성공' });
});

router.get('/google/logout', (req, res) => {
  req.logout();
  // res.redirect('/');
  res.status(200).json({ code: 200, message: '/logout 성공' });
});

router.get('/google', googleStrategy.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', googleStrategy.authenticate('google'), (req, res) => {
  // res.redirect('/');
  res.status(200).json({ code: 200, message: 'authSuccess 성공' });
});

module.exports = router;

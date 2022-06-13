const express = require('express');
const router = express.Router();

require('dotenv').config();

const SERVICE_PATH = '../service';
const MIDDLEWARE_PATH = '../middleware';
const { getMember } = require(`${SERVICE_PATH}/memberService.js`);
const { generateAccessToken, verifyToken } = require(`${MIDDLEWARE_PATH}/jwt.js`);

router.post('/in', (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  const member = getMember(userEmail, userPassword);

  if (!member) {
    res.status(500).json({ code: 500, message: '토큰이 발급되지 않았습니다.' });
    return;
  }

  const result = generateAccessToken(req, res, member);
  res.status(200).json({ code: 200, message: '토큰이 발급되었습니다.', result });
});

router.post('/verify', (req, res) => {
  const { userEmail } = verifyToken(req, res);
  res.status(200).json({ code: 200, message: '토큰이 검증되었습니다.', userEmail });
});

module.exports = router;

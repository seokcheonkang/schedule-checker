const express = require('express');
const router = express.Router();

require('dotenv').config();

const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';
const { generateToken, verifyToken } = require(`${MIDDLEWARE_PATH}/jwt.js`);
const { getMember } = require(`${SERVICE_PATH}/memberService.js`);

router.post('/create', (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  if (!userEmail || !userPassword) {
    res.status(500).json({ code: 500, message: '이메일이나 비밀번호가 없습니다.' });
    return;
  }

  const member = getMember(userEmail, userPassword);
  if (!member) {
    res.status(500).json({ code: 500, message: '토큰이 발급되지 않았습니다.', member });
    return;
  }

  const result = generateToken(req, res, member);
  res.status(200).json({ code: 200, message: '토큰이 발급되었습니다.', result });
});

router.post('/verify', (req, res) => {
  const { userEmail, userGrade } = verifyToken(req, res);
  res.status(200).json({ code: 200, message: '토큰이 검증되었습니다.', userEmail, userGrade });
});

module.exports = router;

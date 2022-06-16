const express = require('express');
const router = express.Router();

require('dotenv').config();

// ---

const LOG = require('../middleware/log');

// ---

const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';
const { generateToken, verifyToken } = require(`${MIDDLEWARE_PATH}/jwt.js`);
const { getMemberByUserEmail } = require(`${SERVICE_PATH}/memberService.js`);

// ---

router.post('/create', (req, res) => {
  LOG(req.originalUrl);

  const userEmail = req.body.userEmail;

  if (!userEmail) {
    return res.status(500).json({ code: 500, message: '이메일이 없습니다.' });
  }

  const member = getMemberByUserEmail(userEmail);
  if (!member) {
    return res.status(500).json({ code: 500, message: '해당하는 회원이 존재 하지 않습니다.', member });
  }

  const result = generateToken(req, res, member);

  const response = { code: 200, message: '토큰이 정상 발급되었습니다.', result };

  LOG(response);

  res.status(200).json(response);
});

router.post('/verify', (req, res) => {
  LOG(req.originalUrl);

  let response = null;
  try {
    response = verifyToken(req, res);
    LOG(response);
  } catch (error) {
    LOG(error);
  } finally {
    return response;
  }
});

module.exports = router;

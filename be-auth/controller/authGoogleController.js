const express = require('express');
const router = express.Router();

require('dotenv').config();

// ---
const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);

// ---
const { generateToken, verifyToken } = require(`${MIDDLEWARE_PATH}/jwt.js`);
const { getMemberByUserEmail } = require(`${SERVICE_PATH}/memberService.js`);

// ---
router.post('/create', async (req, res) => {
  LOGD(req.originalUrl);

  const user_email = req.body.user_email;

  if (!user_email) {
    return res.status(500).json({ code: 500, message: '이메일이 없습니다.' });
  }

  const member = await getMemberByUserEmail(user_email);
  if (!member) {
    return res.status(500).json({ code: 500, message: '해당하는 회원이 존재 하지 않습니다.', member });
  }

  const result = await generateToken(req, res, member);

  const response = { code: 200, message: '토큰이 정상 발급되었습니다.', result };

  LOGD(response);

  res.status(200).json(response);
});

router.post('/verify', (req, res) => {
  LOGD(req.originalUrl);

  let response = null;
  try {
    response = verifyToken(req, res);
    LOGD(response);
  } catch (error) {
    LOGD(error);
  } finally {
    return response;
  }
});

module.exports = router;

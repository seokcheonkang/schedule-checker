const express = require('express');
const router = express.Router();

const os = require('os');

// ---
const MIDDLEWARE_PATH = '../middleware';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);
const EMAIL = require(`${MIDDLEWARE_PATH}/email`);

// ---
router.get('/', (req, res) => {
  LOGD(req.originalUrl);

  const result = { userAgent: req.headers['user-agent'], hostname: os.hostname() };

  const response = { code: 200, message: '조회 성공', result };

  LOGD(JSON.stringify(response));

  res.status(200).json(response);
});

router.post('/email', (req, res) => {
  LOGD(req.originalUrl);

  const email = req.body.email;
  const title = 'Schedule Checker Email Test';
  const text = `
  이 이메일은 단순히 테스트 입니다~
  감사합니다.
  `;
  let html = `
    <h1>안녕하세요? Schedule Checker 관리자입니다.</h1>
    <br />
    <b>${text.replaceAll('\r', '<br />')}</b>
  `;

  EMAIL.initTransporter();
  EMAIL.sendEmail(email, title, text, html);

  const response = { code: 200, message: '이메일 전송 성공', result: true };

  LOGD(JSON.stringify(response));

  res.status(200).json(response);
});

module.exports = router;

const express = require('express');
const router = express.Router();

// ---
const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);
const verifyJwt = require(`${MIDDLEWARE_PATH}/verifyJwt`);
const EMAIL = require(`${MIDDLEWARE_PATH}/email`);

// ---
const { sendEmailByRequest, sendEmailInsertNewSchedule } = require(`${SERVICE_PATH}/emailService`);

// ---
// router.post('/', verifyJwt, async (req, res) => {
router.post('/', async (req, res) => {
  LOGD(req.originalUrl);

  const emailInfo = {
    schedule_code: req.body.schedule_code,
    status: req.body.status,
    status_val: req.body.status_val,
    title: req.body.title,
    content: req.body.content,
    emails: req.body.user_emails,
  };

  const result = await sendEmailByRequest(emailInfo);

  const response = { code: 200, message: '이메일 전송 성공', result: true };

  LOGD(JSON.stringify(response));

  res.status(200).json(response);
});

module.exports = router;

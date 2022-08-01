const express = require('express');
const router = express.Router();

// ---
const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);
const verifyJwt = require(`${MIDDLEWARE_PATH}/verifyJwt`);
const DATETIME = require(`${MIDDLEWARE_PATH}/datetime`);

// ---
const {
  selectStatScheduleStatus,
  selectStatScheduleProcess,
  selectStatScheduleUser,
} = require(`${SERVICE_PATH}/statService`);

// ---
// router.get('/schedule/status', verifyJwt, async (req, res) => {
router.get('/schedule/status', async (req, res) => {
  LOGD(req.originalUrl);

  const reqParam = {
    yyyy: req.body.yyyy ? req.body.yyyy : DATETIME.getYyyy(),
  };

  const result = await selectStatScheduleStatus(reqParam);

  const response = { code: 200, message: '조회 성공', result };

  LOGD(JSON.stringify(response));

  res.status(200).json(response);
});

// router.get('/schedule/process', verifyJwt, async (req, res) => {
router.get('/schedule/process', async (req, res) => {
  LOGD(req.originalUrl);

  const reqParam = {
    yyyy: req.body.yyyy ? req.body.yyyy : DATETIME.getYyyy(),
  };

  const result = await selectStatScheduleProcess(reqParam);

  const response = { code: 200, message: '조회 성공', result };

  LOGD(JSON.stringify(response));

  res.status(200).json(response);
});

// router.get('/schedule/user', verifyJwt, async (req, res) => {
router.get('/schedule/user', async (req, res) => {
  LOGD(req.originalUrl);

  const reqParam = {
    yyyy: req.body.yyyy ? req.body.yyyy : DATETIME.getYyyy(),
  };

  const result = await selectStatScheduleUser(reqParam);

  const response = { code: 200, message: '조회 성공', result };

  LOGD(JSON.stringify(response));

  res.status(200).json(response);
});

module.exports = router;

const express = require('express');
const router = express.Router();

// ---
const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';

// ---
const UTIL = require(`${MIDDLEWARE_PATH}/util`);
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
router.get('/schedule/status', verifyJwt, (req, res, next) => {
  LOGD(req.originalUrl);

  const thisRequestParam = {
    yyyy: req.query.yyyy ? req.query.yyyy : DATETIME.getYyyy(),
  };

  UTIL.processGet(next, res, selectStatScheduleStatus, thisRequestParam);
});

router.get('/schedule/process', verifyJwt, (req, res, next) => {
  LOGD(req.originalUrl);

  const thisRequestParam = {
    yyyy: req.query.yyyy ? req.query.yyyy : DATETIME.getYyyy(),
  };

  UTIL.processGet(next, res, selectStatScheduleProcess, thisRequestParam);
});

router.get('/schedule/user', verifyJwt, (req, res, next) => {
  LOGD(req.originalUrl);

  const thisRequestParam = {
    yyyy: req.query.yyyy ? req.query.yyyy : DATETIME.getYyyy(),
  };

  UTIL.processGet(next, res, selectStatScheduleUser, thisRequestParam);
});

module.exports = router;

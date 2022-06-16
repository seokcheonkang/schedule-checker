const express = require('express');
const router = express.Router();

// ---

const MIDDLEWARE_PATH = '../middleware';
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const verifyJwt = require(`${MIDDLEWARE_PATH}/verifyJwt`);

const SERVICE_PATH = '../service';
const { getSchedules } = require(`${SERVICE_PATH}/scheduleService`);

// ---

router.get('/', verifyJwt, (req, res) => {
  LOG(req.originalUrl);

  const result = getSchedules();

  const response = { code: 200, message: '조회 성공', result };

  // TODO
  // LOG(JSON.stringify(response));

  res.status(200).json(response);
});

module.exports = router;

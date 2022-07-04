const express = require('express');
const router = express.Router();

// ---
const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const verifyJwt = require(`${MIDDLEWARE_PATH}/verifyJwt`);
const { getSchedules, getSchedule } = require(`${SERVICE_PATH}/scheduleService`);

// ---
router.get('/', verifyJwt, async (req, res) => {
  LOG(req.originalUrl);

  const result = await getSchedules();

  const response = { code: 200, message: '조회 성공', result };

  LOG(JSON.stringify(response));

  res.status(200).json(response);
});

router.get('/:seq', verifyJwt, (req, res) => {
  LOG(req.originalUrl);

  const seq = req.params.seq;

  const result = getSchedule(seq);

  const response = { code: 200, message: '조회 성공', result };

  LOG(JSON.stringify(response));

  res.status(200).json(response);
});

module.exports = router;

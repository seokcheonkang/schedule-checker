const express = require('express');
const router = express.Router();

// ---

const LOG = require('../middleware/log');

// ---

const SERVICE_PATH = '../service';
const { getSchedules } = require(`${SERVICE_PATH}/scheduleService`);

// ---

router.get('/', (req, res) => {
  LOG(req.originalUrl);

  const result = getSchedules();

  const response = { code: 200, message: '조회 성공', result };

  LOG(JSON.stringify(response));

  res.status(200).json(response);
});

module.exports = router;

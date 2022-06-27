const express = require('express');
const router = express.Router();

const os = require('os');

// ---
const MIDDLEWARE_PATH = '../middleware';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);

// ---
router.get('/', (req, res) => {
  LOG(req.originalUrl);

  const result = { userAgent: req.headers['user-agent'], hostname: os.hostname() };

  const response = { code: 200, message: '조회 성공', result };

  LOG(JSON.stringify(response));

  res.status(200).json(response);
});

module.exports = router;

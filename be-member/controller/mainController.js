const express = require('express');
const router = express.Router();

require('dotenv').config();

// ---
const MIDDLEWARE_PATH = '../middleware';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);

// ---
router.get('/', (req, res) => {
  LOGD(req.originalUrl);

  const response = { code: 200, message: '정상적으로 응답했습니다.' };

  LOGD(response);

  res.status(200).json(response);
});

module.exports = router;

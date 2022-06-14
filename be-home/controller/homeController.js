const express = require('express');
const router = express.Router();

const os = require('os');

router.get('/', (req, res) => {
  const result = { userAgent: req.headers['user-agent'], hostname: os.hostname() };

  res.status(200).json({ code: 200, message: '조회 성공', result });
});

module.exports = router;

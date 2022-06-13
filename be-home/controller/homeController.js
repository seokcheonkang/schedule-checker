const express = require('express');
const router = express.Router();

const os = require('os');

router.get('/', (req, res) => {
  const result = { userAgent: req.headers['user-agent'], hostname: os.hostname() };

  res.send(result);
});

module.exports = router;

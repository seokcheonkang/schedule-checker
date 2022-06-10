const express = require('express');
const router = express.Router();

const SERVICE_PATH = '../service';
const service = require(`${SERVICE_PATH}/schedules`);

router.get('/', (req, res) => {
  const result = service();

  res.send(result);
});

module.exports = router;

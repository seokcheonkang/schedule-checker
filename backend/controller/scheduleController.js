const express = require('express');
const router = express.Router();

const SERVICE_PATH = '../service';
const { getSchedules } = require(`${SERVICE_PATH}/scheduleService`);

router.get('/', (req, res) => {
  const result = getSchedules();
  res.send(result);
});

module.exports = router;

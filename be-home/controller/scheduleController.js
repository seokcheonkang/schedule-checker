const express = require('express');
const router = express.Router();

const SERVICE_PATH = '../service';
const { getSchedules } = require(`${SERVICE_PATH}/scheduleService`);

router.get('/', (req, res) => {
  const result = getSchedules();

  res.status(200).json({ code: 200, message: '조회 성공', result });
});

module.exports = router;

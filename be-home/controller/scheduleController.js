const express = require('express');
const router = express.Router();

// ---
const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const verifyJwt = require(`${MIDDLEWARE_PATH}/verifyJwt`);
const { getSchedules, getSchedule, insertSchedule, insertScheduleDetail } = require(`${SERVICE_PATH}/scheduleService`);

// ---
router.get('/', verifyJwt, async (req, res) => {
  LOG(req.originalUrl);

  const result = await getSchedules();

  const response = { code: 200, message: '조회 성공', result };

  LOG(JSON.stringify(response));

  res.status(200).json(response);
});

router.get('/:schedule_code', verifyJwt, async (req, res) => {
  LOG(req.originalUrl);

  const schedule_code = req.params.schedule_code;

  const result = await getSchedule(schedule_code);

  const response = { code: 200, message: '조회 성공', result };

  LOG(JSON.stringify(response));

  res.status(200).json(response);
});

router.post('/create', verifyJwt, async (req, res) => {
  LOG(req.originalUrl);

  const scheduleInfo = req.body;
  scheduleInfo.regist_date = scheduleInfo.regist_date + ' ' + scheduleInfo.regist_time;
  scheduleInfo.limit_date = scheduleInfo.limit_date + ' ' + scheduleInfo.limit_time;

  const resultSchedule = await insertSchedule(scheduleInfo);
  scheduleInfo.insertId = Number(resultSchedule.insertId);
  const resultScheduleDetail = await insertScheduleDetail(scheduleInfo);

  const response = { code: 201, message: '생성 성공', resultScheduleDetail };

  LOG(JSON.stringify(response));

  res.status(201).json(response);
});

module.exports = router;

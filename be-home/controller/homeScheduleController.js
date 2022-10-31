const express = require('express');
const router = express.Router();

// ---
const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);
const verifyJwt = require(`${MIDDLEWARE_PATH}/verifyJwt`);

// ---
const {
  selectSchedules,
  selectSchedule,
  insertSchedule,
  insertScheduleDetail,
  updateSchedule,
  deleteScheduleDetail,
  selectScheduleMember,
  updateScheduleDetail,
} = require(`${SERVICE_PATH}/scheduleService`);

const { sendEmailInsertNewSchedule, sendEmailUpdateSchedule } = require(`${SERVICE_PATH}/emailService`);

// ---
router.get('/', async (req, res) => {
  LOGD(req.originalUrl);

  const result = await selectSchedules();

  const response = { code: 200, message: '성공', result };

  LOGD(JSON.stringify(response));

  res.status(200).json(response);
});

router.get('/:schedule_code', async (req, res) => {
  LOGD(req.originalUrl);

  const schedule_code = req.params.schedule_code;

  const result = await selectSchedule(schedule_code);

  const response = { code: 200, message: '성공', result };

  LOGD(JSON.stringify(response));

  res.status(200).json(response);
});

router.post('/create', verifyJwt, async (req, res) => {
  LOGD(req.originalUrl);

  const scheduleInfo = req.body;
  scheduleInfo.regist_date = scheduleInfo.regist_date + ' ' + scheduleInfo.regist_time;
  scheduleInfo.limit_date = scheduleInfo.limit_date + ' ' + scheduleInfo.limit_time;

  let response = { code: 500, message: '실패', result: false };

  try {
    const resultSchedule = await insertSchedule(scheduleInfo);
    scheduleInfo.insertId = Number(resultSchedule.insertId);

    const resultScheduleDetail = await insertScheduleDetail(scheduleInfo);

    let resultSendMail = false;
    if (scheduleInfo.status === '99' && resultScheduleDetail.length > 1) {
      resultSendMail = await sendEmailInsertNewSchedule(resultScheduleDetail);
    }

    response = { code: 201, message: '생성 성공', resultSendMail };
  } catch (error) {
    LOGD('error', JSON.stringify(error));
  } finally {
    LOGD('finally', JSON.stringify(response));

    res.status(201).json(response);
  }
});

router.patch('/update', verifyJwt, async (req, res) => {
  LOGD(req.originalUrl);

  const scheduleInfo = req.body;
  scheduleInfo.regist_date = scheduleInfo.regist_date + ' ' + scheduleInfo.regist_time;
  scheduleInfo.limit_date = scheduleInfo.limit_date + ' ' + scheduleInfo.limit_time;

  let response = { code: 500, message: '실패', result: false };

  try {
    const resultSchedule = await updateSchedule(scheduleInfo);
    scheduleInfo.insertId = scheduleInfo.schedule_code;

    if (scheduleInfo.checked_users) {
      const resultDeleteScheduleDetail = await deleteScheduleDetail(scheduleInfo);
      const resultInsertScheduleDetail = await insertScheduleDetail(scheduleInfo);

      let resultSendMail = false;
      if (scheduleInfo.status === '99' && resultInsertScheduleDetail.length > 1) {
        resultSendMail = await sendEmailUpdateSchedule(resultInsertScheduleDetail);
      }

      response = { code: 201, message: '수정 성공', resultSendMail };
    }
  } catch (error) {
    LOGD('error', error);
  } finally {
    LOGD('finally', JSON.stringify(response));

    res.status(201).json(response);
  }
});

router.get('/:schedule_code/:user_email', verifyJwt, async (req, res) => {
  LOGD(req.originalUrl);

  const schedule_code = req.params.schedule_code;
  const user_email = req.params.user_email;

  const scheduleInfo = {
    schedule_code,
    user_email,
  };

  const result = await selectScheduleMember(scheduleInfo);

  const response = { code: 200, message: '성공', result };

  LOGD(JSON.stringify(response));

  res.status(200).json(response);
});

router.patch('/:schedule_code/:user_email', verifyJwt, async (req, res) => {
  LOGD(req.originalUrl);

  const schedule_code = req.params.schedule_code;
  const user_email = req.params.user_email;
  const status = req.body.status;

  const scheduleInfo = {
    schedule_code,
    user_email,
    status,
  };

  const result = Number(await updateScheduleDetail(scheduleInfo));

  const response = { code: 201, message: '수정 성공', result };

  LOGD(JSON.stringify(response));

  res.status(201).json(response);
});

module.exports = router;

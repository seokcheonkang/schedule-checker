const express = require('express');
const router = express.Router();

require('dotenv').config();

// ---
const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);

// ---
const verifyJwt = require(`${MIDDLEWARE_PATH}/verifyJwt`);
const {
  getMembers,
  getMemberByUserEmail,
  insertMember,
  updateMember,
  deleteMember,
} = require(`${SERVICE_PATH}/memberService.js`);

// ---
router.get('/', verifyJwt, async (req, res) => {
  LOGD(req.originalUrl);

  const result = await getMembers();
  const response = { code: null, result };
  response.code = 200; // OK
  if (!result) {
    response.code = 204; // No Content
  }

  LOGD(JSON.stringify(response));

  res.status(response.code).json(response);
});

// router.get('/:user_email', verifyJwt, async (req, res) => {
router.get('/:user_email', async (req, res) => {
  LOGD(req.originalUrl);

  const user_email = req.params.user_email;

  const result = await getMemberByUserEmail(user_email);

  const response = { code: null, result };
  response.code = 200; // OK
  if (!result) {
    response.code = 204; // No Content
  }

  LOGD(JSON.stringify(response));

  res.status(response.code).json(response);
});

router.post('/', async (req, res) => {
  LOGD(req.originalUrl);

  const user_code = req.body.user_code;
  const user_email = req.body.user_email;
  const user_name = req.body.user_name;

  const userInfo = {
    user_code,
    user_email,
    user_name,
  };

  const result = await insertMember(userInfo);

  const response = { code: null, result };
  response.code = 201; // Created
  if (!result) {
    response.code = 204; // No Content
  }

  LOGD(JSON.stringify(response));

  res.status(response.code).json(response);
});

router.patch('/:user_email', verifyJwt, async (req, res) => {
  LOGD(req.originalUrl);

  const grade = req.body.grade;
  const status = req.body.status;
  const user_email = req.params.user_email;

  const userInfo = {
    grade,
    status,
    user_email,
  };

  const result = await updateMember(userInfo);

  const response = { code: null, result };
  response.code = 201; // Created
  if (!result) {
    response.code = 204; // No Content
  }

  LOGD(JSON.stringify(response));

  res.status(response.code).json(response);
});

router.delete('/:user_email', verifyJwt, async (req, res) => {
  LOGD(req.originalUrl);

  const user_email = req.params.user_email;

  const result = await deleteMember(user_email);

  const response = { code: null, result };
  response.code = 201; // Created
  if (!result) {
    response.code = 204; // No Content
  }

  LOGD(JSON.stringify(response));

  res.status(response.code).json(response);
});

module.exports = router;

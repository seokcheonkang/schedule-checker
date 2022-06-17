const express = require('express');
const router = express.Router();

require('dotenv').config();

// ---

const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';

// ---

const LOG = require(`${MIDDLEWARE_PATH}/log`);
const verifyJwt = require(`${MIDDLEWARE_PATH}/verifyJwt`);
const { getMembers, getMemberByUserEmail } = require(`${SERVICE_PATH}/memberService.js`);

// ---

router.get('/', verifyJwt, (req, res) => {
  LOG(req.originalUrl);

  const result = getMembers();

  const response = { code: 200, message: '조회 성공', result };

  LOG(JSON.stringify(response));

  res.status(200).json(response);
});

router.get('/:userEmail', verifyJwt, (req, res) => {
  LOG(req.originalUrl);

  const userEmail = req.params.userEmail;

  const result = getMemberByUserEmail(userEmail);

  const response = { code: 200, message: '조회 성공', result };

  LOG(JSON.stringify(response));

  res.status(200).json(response);
});

module.exports = router;

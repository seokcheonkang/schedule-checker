const express = require('express');
const router = express.Router();

require('dotenv').config();

// ---

const MIDDLEWARE_PATH = '../middleware';
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const verifyJwt = require(`${MIDDLEWARE_PATH}/verifyJwt`);

const SERVICE_PATH = '../service';
const { getMembers } = require(`${SERVICE_PATH}/memberService.js`);

// ---

router.get('/', verifyJwt, (req, res) => {
  const result = getMembers();

  res.status(200).json({ code: 200, message: '조회 성공', result });
});

module.exports = router;

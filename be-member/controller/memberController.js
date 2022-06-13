const express = require('express');
const router = express.Router();

require('dotenv').config();

const SERVICE_PATH = '../service';
const { getMembers } = require(`${SERVICE_PATH}/memberService.js`);

router.get('/', (req, res) => {
  const result = getMembers();
  res.send(result);
});

module.exports = router;

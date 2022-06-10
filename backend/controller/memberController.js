const express = require('express');
const router = express.Router();

require('dotenv').config();
const jwt = require('jsonwebtoken');

const SERVICE_PATH = '../service';
const { getMembers } = require(`${SERVICE_PATH}/memberService.js`);

router.get('/', (req, res) => {
  const result = getMembers();
  res.send(result);
});

// router.get('/:id', (req, res) => {
//   console.log(req.params.id);

//   res.send(req.params.id);
// });

module.exports = router;

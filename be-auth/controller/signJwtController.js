const express = require('express');
const router = express.Router();

require('dotenv').config();

const SERVICE_PATH = '../service';
const { getMember } = require(`${SERVICE_PATH}/memberService.js`);
const { generateAccessToken } = require(`${SERVICE_PATH}/jwtService.js`);

router.post('/in', (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  const member = getMember(userEmail, userPassword);

  if (!member) {
    res.sendStatus(500);
  }

  const accessToken = generateAccessToken(member);
  res.json({ accessToken });
});

module.exports = router;

const express = require('express');
const router = express.Router();

require('dotenv').config();
const jwt = require('jsonwebtoken');

const SERVICE_PATH = '../service';
const { getMember } = require(`${SERVICE_PATH}/members.js`);

router.post('/in', (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  const member = getMember(userEmail, userPassword);

  if (!member) {
    res.sendStatus(500);
  }

  const generateAccessToken = (member) => {
    const result = { userEmail: member.userEmail, userName: member.userName, userGrade: member.userGrade };

    return jwt.sign(result, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
    });
  };

  const accessToken = generateAccessToken(member);
  res.json({ accessToken });
});

module.exports = router;

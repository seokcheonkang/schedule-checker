const express = require('express');
const router = express.Router();

require('dotenv').config();
const jwt = require('jsonwebtoken');

const SERVICE_PATH = '../service';
const { getMember } = require(`${SERVICE_PATH}/memberService.js`);

router.post('/in', (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  const member = getMember(userEmail, userPassword);

  if (!member) {
    res.sendStatus(500);
  }

  const generateAccessToken = (member) => {
    let result = null;

    if (member) {
      result = jwt.sign(
        { userEmail: member.userEmail, userName: member.userName, userGrade: member.userGrade },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
        }
      );
    }

    return result;
  };

  const accessToken = generateAccessToken(member);
  res.json({ accessToken });
});
module.exports = router;

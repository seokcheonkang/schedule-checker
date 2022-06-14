const express = require('express');
const router = express.Router();

require('dotenv').config();

const SERVICE_PATH = '../service';
const { getMember } = require(`${SERVICE_PATH}/memberService.js`);

router.post('/in', (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  const member = getMember(userEmail, userPassword);

  if (!member) {
    res.status(500).json({ code: 500, message: '토큰이 발급되지 않았습니다.', member });
    return;
  }

  // const result = generateToken(req, res, member.userEmail, member.userPassword);
  res.status(200).json({ code: 200, message: '토큰이 발급되었습니다.', member });
});

module.exports = router;

const express = require('express');
const router = express.Router();

require('dotenv').config();
const jwt = require('jsonwebtoken');

const SERVICE_PATH = '../service';
const { getMembers, getMember } = require(`${SERVICE_PATH}/members.js`);

router.get('/', (req, res) => {
  // const result = service();
  const m = getMember('idealful@gmail.com');
  console.log(m);
  const result = getMembers();

  res.send(result);
});

// router.get('/:id', (req, res) => {
//   console.log(req.params.id);

//   res.send(req.params.id);
// });

router.post('/login', (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  // const members = service();
  const members = getMembers();

  const member = members.find((member) => member.userEmail === userEmail && member.userPassword === userPassword);

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

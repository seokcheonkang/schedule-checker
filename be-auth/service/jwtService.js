const jsonwebtoken = require('jsonwebtoken');

const service = {
  generateAccessToken: (member) => {
    let result = null;

    const args = { userEmail: member.userEmail, userName: member.userName, userGrade: member.userGrade };

    const options = {
      expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
      issuer: process.env.JWT_ACCESS_TOKEN_ISSUER,
    };

    if (member) {
      result = jsonwebtoken.sign(args, process.env.JWT_ACCESS_TOKEN_SECRET, options);
    }

    return result;
  },
};

module.exports = service;

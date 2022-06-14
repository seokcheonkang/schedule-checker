const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

const service = {
  generateToken: (req, res, member) => {
    const args = { userEmail: member.userEmail, userName: member.userName, userGrade: member.userGrade };

    const key = process.env.JWT_ACCESS_TOKEN_SECRET;

    const options = {
      expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
      issuer: process.env.JWT_ACCESS_TOKEN_ISSUER,
    };

    req.headers.authorization = jwt.sign(args, key, options);

    const result = {
      accessToken: req.headers.authorization,
      refreshToken: randToken.uid(256),
    };

    return result;
  },
  verifyToken: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');

    const key = process.env.JWT_ACCESS_TOKEN_SECRET;

    try {
      req.decode = jwt.verify(token, key);
      return req.decode;
    } catch (error) {
      // 유효시간 초과
      if (error.name === 'TokenExpiredError') {
        return res.status(419).json({
          code: 419,
          message: '토큰이 만료되었습니다.',
        });
      }
      // 토큰의 비밀키 불일치
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          code: 401,
          message: '유효하지 않은 토큰입니다.',
        });
      }
    }
  },
};

module.exports = service;

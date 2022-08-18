const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const path = require('path');

// --
const MIDDLEWARE_PATH = './';
const SECRET_PATH = '/app/deploy/secret';

// --
const LOG = require(`${MIDDLEWARE_PATH}./log`);
const LOGD = require(`${MIDDLEWARE_PATH}./logd`);
const KEY = require(path.join(SECRET_PATH, 'key'));

// ---
const service = {
  generateToken: (req, res, member) => {
    LOGD('generateToken');

    const args = {
      user_email: member.result.user_email,
      user_name: member.result.user_name,
      grade: member.result.grade,
      status: member.result.status,
    };

    const key = KEY.getJwtAccessTokenSecret(process.env.NODE_ENV);

    const options = {
      expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
      issuer: process.env.JWT_ACCESS_TOKEN_ISSUER,
    };

    LOGD('options', JSON.stringify(options));

    req.headers.authorization = jwt.sign(args, key, options);

    const result = {
      accessToken: req.headers.authorization,
      refreshToken: randToken.uid(256),
    };

    return result;
  },
  verifyToken: (req, res) => {
    LOGD('verifyToken');

    const token = req.headers.authorization.replace('Bearer ', '');

    const key = KEY.getJwtAccessTokenSecret(process.env.NODE_ENV);

    let result = '';

    try {
      result = jwt.verify(token, key);
      return res.status(200).json({ code: 200, message: '토큰이 생성되었거나 검증되었습니다.', result });
    } catch (error) {
      // 유효시간 초과
      if (error.name === 'TokenExpiredError') {
        return res.status(419).json({ code: 419, message: '토큰이 만료되었습니다.' });
      }
      // 토큰의 비밀키 불일치
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ code: 401, message: '유효하지 않은 토큰입니다.' });
      }
    }
  },
};

module.exports = service;

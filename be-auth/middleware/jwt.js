const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

const service = {
  generateAccessToken: (req, res, member) => {
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

    // 인증 완료
    try {
      // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
      req.decode = jwt.verify(token, key);
      return req.decode;
    } catch (error) {
      // 인증 실패
      // 유효시간이 초과된 경우
      if (error.name === 'TokenExpiredError') {
        return res.status(419).json({
          code: 419,
          message: '토큰이 만료되었습니다.',
        });
      }
      // 토큰의 비밀키가 일치하지 않는 경우
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

const request = require('request');

const MIDDLEWARE_PATH = './';
const LOG = require(`${MIDDLEWARE_PATH}/log`);

const verifyJwt = (req, res, next) => {
  LOG('fn verifyJwt');

  let response = null;

  const authorization = req.headers.authorization;
  if (!authorization) {
    response = res.status(401).json({ code: 401, message: 'Unauthorized' });
    return response;
  }

  request.post(
    { url: `${process.env.BASE_URL_BACKEND_AUTH}/auth/google/verify`, headers: { authorization }, form: req.body },
    (err, httpResponse, body) => {
      LOG(body);
      const code = JSON.parse(body).code;

      if (err) {
        response = res.status(403).json({ code: 403, message: 'Forbidden' });
        return response;
      }

      if (code === 419) {
        response = res.status(419).json({ code: 419, message: '인증이 만료되었습니다.' });
        return response;
      }

      next();
    }
  );
};

module.exports = verifyJwt;

const path = require('path');

// --
const ENV_PATH = '../env';
const dotenv = require('dotenv');

// --
const MIDDLEWARE_PATH = '../middleware';
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);

// --
const UTIL = {
  setEnv: (nodeEnv) => {
    const param = `${ENV_PATH}/.env.${nodeEnv}`;
    dotenv.config({ path: path.join(__dirname, param) });
    LOGD('UTIL.setEnv()', param);
  },
  getEnv: () => {
    const param = `${ENV_PATH}/.env.${process.env.NODE_ENV}`;
    const result = { path: path.join(__dirname, param) };
    LOGD('UTIL.getEnv()', param);
    LOGD('UTIL.getEnv()', result);
    return result;
  },
  setCors: (res) => {
    res.header('Access-Control-Allow-Origin', process.env.BASE_URL_FRONTEND);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    LOGD('UTIL.setCors()', JSON.stringify({ 'Access-Control-Allow-Origin': process.env.BASE_URL_FRONTEND }));
  },
  processGet: async (next, res, callback, thisRequestParam) => {
    let thisResponse = {
      status: 500,
      code: 500,
      message: '',
      result: null,
    };

    try {
      thisResponse.result = await callback(thisRequestParam);

      if (thisResponse.result) {
        thisResponse.status = 200;
        thisResponse.code = 200;
        thisResponse.message = '조회 성공';
      } else {
        thisResponse.status = 204;
        thisResponse.code = 204;
        thisResponse.message = '콘텐트 없음';
      }
    } catch (error) {
      thisResponse.status = 500;
      thisResponse.code = 500;
      thisResponse.message = '서버 내부 에러';

      LOGD('error', JSON.stringify(thisResponse));
    } finally {
      LOGD('finally', JSON.stringify(thisResponse));

      res.status(thisResponse.status).json(thisResponse);

      next();
    }
  },
};

module.exports = UTIL;

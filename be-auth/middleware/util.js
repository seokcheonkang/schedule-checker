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
};

module.exports = UTIL;

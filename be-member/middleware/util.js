const path = require('path');

const ENV_PATH = '../env';
const dotenv = require('dotenv');

const LOG = require('../middleware/log');

const util = {
  setEnv: (nodeEnv) => {
    dotenv.config({ path: path.join(__dirname, `${ENV_PATH}/.env.${nodeEnv}`) });
  },
  getEnv: () => {
    return { path: path.join(__dirname, `${ENV_PATH}/.env.${process.env.NODE_ENV}`) };
  },
  setCors: (res) => {
    LOG('process.env.BASE_URL_FRONTEND', process.env.BASE_URL_FRONTEND);
    res.header('Access-Control-Allow-Origin', process.env.BASE_URL_FRONTEND);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  },
};

module.exports = util;

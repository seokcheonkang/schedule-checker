// --
const MIDDLEWARE_PATH = '../middleware';
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);

// --
const DATETIME = {
  getYyyy: () => {
    let result = new Date().getFullYear();
    LOGD('DATETIME.getYyyy()', result);
    return result;
  },
  getMm: () => {
    let result = new Date().getMonth();
    result = result < 10 ? '0' + result : result;
    LOGD('DATETIME.getMm()', result);
    return result;
  },
  getDd: () => {
    let result = new Date().getDate();
    result = result < 10 ? '0' + result : result;
    LOGD('DATETIME.getDd()', result);
    return result;
  },
  getHh: () => {
    let result = new Date().getHours();
    result = result < 10 ? '0' + result : result;
    LOGD('DATETIME.getHh()', result);
    return result;
  },
  getMi: () => {
    let result = new Date().getMinutes();
    result = result < 10 ? '0' + result : result;
    LOGD('DATETIME.getMi()', result);
    return result;
  },
  getSs: () => {
    let result = new Date().getSeconds();
    result = result < 10 ? '0' + result : result;
    LOGD('DATETIME.getSs()', result);
    return result;
  },
};

module.exports = DATETIME;

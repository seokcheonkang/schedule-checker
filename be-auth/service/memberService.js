const request = require('request-promise-native');

// ---
const MIDDLEWARE_PATH = '../middleware';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);

// ---
const service = {
  selectMemberByUserEmail: async (user_email) => {
    let result = null;

    const options = { url: `${process.env.BASE_URL_BACKEND_HOME}/members/${user_email}`, method: 'get' };

    LOGD('options', JSON.stringify(options)); // TODO

    try {
      result = await request
        .get(options)
        .then((res) => {
          LOGD('res', res); // TODO
          LOGD('res1', JSON.stringify(res)); // TODO
          LOGD('res2', JSON.parse(res)); // TODO

          let response = null;
          const code = res.code;
          if (code === 204) {
            response = res.status(204).json({ code: 204, message: 'No Content' });
            return response;
          }

          response = JSON.parse(res);
          return response;
        })
        .catch((err) => {
          if (err) {
            response = res.status(500).json({ code: 500, message: 'Internal Server Error' });
            return response;
          }
        });
    } catch (error) {
      LOGD('error', error); // TODO
      LOGD('error1', JSON.stringify(error)); // TODO
      LOGD('error2', JSON.parse(error)); // TODO
    } finally {
      return result;
    }
  },
};

module.exports = service;

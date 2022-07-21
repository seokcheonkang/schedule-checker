const request = require('request-promise-native');

// ---
const MIDDLEWARE_PATH = '../middleware';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);

// ---
const service = {
  selectMemberByUserEmail: async (user_email) => {
    const options = { url: `${process.env.BASE_URL_BACKEND_MEMBER}/members/${user_email}`, method: 'get' };

    const result = await request
      .get(options)
      .then((res) => {
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

    return result;
  },
};

module.exports = service;

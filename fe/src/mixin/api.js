import axios from 'axios';

// mixin
import CONSTANT from '@/mixin/constant';
import { LOG, LOGD } from '@/mixin/log.js';

export default async (method = 'get', url, data, headers) => {
  LOGD(CONSTANT.REQ, method, url, JSON.stringify(data), JSON.stringify(headers));

  return await axios({
    method,
    url,
    data,
    headers,
  })
    .then((res) => {
      const resData = res.data;

      LOGD(CONSTANT.RES, method, url, JSON.stringify(resData));

      return resData;
    })
    .catch((err) => {
      const errData = { code: err.code, message: err.message, result: null };

      LOGD(CONSTANT.RES, method, url, JSON.stringify(errData));

      return errData;
    });
};

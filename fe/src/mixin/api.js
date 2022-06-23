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
    .then((response) => {
      LOGD(CONSTANT.RES, method, url, JSON.stringify(response.data));

      return response.data;
    })
    .catch((e) => {
      return { code: e.code, message: e.message, result: null };
    });
};

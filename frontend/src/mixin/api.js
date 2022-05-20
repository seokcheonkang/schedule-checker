import axios from 'axios';
import { RESULT_CODE_SUCCESS, RESULT_MESSAGE_SUCCESS } from './message';

export default async (url, payload, method = 'get') => {
  return await axios({
    method,
    url,
    payload,
  })
    .then((response) => {
      return { resultCode: RESULT_CODE_SUCCESS, resultMessage: RESULT_MESSAGE_SUCCESS, data: response.data };
    })
    .catch((e) => {
      return { resultCode: e.code, resultMessage: e.message, data: null };
    });
};

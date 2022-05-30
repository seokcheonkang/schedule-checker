import axios from 'axios';
import message from './message';

export default async (url, payload, method = 'get') => {
  return await axios({
    method,
    url,
    payload,
  })
    .then((response) => {
      return {
        resultCode: message.RESULT_CODE_SUCCESS,
        resultMessage: message.RESULT_MESSAGE_SUCCESS,
        data: response.data,
      };
    })
    .catch((e) => {
      return { resultCode: e.code, resultMessage: e.message, data: null };
    });
};

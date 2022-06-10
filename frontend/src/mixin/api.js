import axios from 'axios';
import message from './message';

export default async (url, data, method = 'get') => {
  return await axios({
    url,
    data,
    method,
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

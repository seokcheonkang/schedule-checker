import axios from 'axios';
import MESSAGE from './message';

export default async (url, data, method = 'get') => {
  return await axios({
    url,
    data,
    method,
  })
    .then((response) => {
      return {
        resultCode: MESSAGE.RESULT_CODE_SUCCESS,
        resultMessage: MESSAGE.RESULT_MESSAGE_SUCCESS,
        data: response.data,
      };
    })
    .catch((e) => {
      return { resultCode: e.code, resultMessage: e.message, data: null };
    });
};

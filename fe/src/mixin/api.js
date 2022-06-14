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
        data: response.data,
      };
    })
    .catch((e) => {
      return { resultCode: e.code, resultMessage: e.message };
    });
};

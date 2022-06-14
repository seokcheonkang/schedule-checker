import axios from 'axios';

export default async (url, data, method = 'get') => {
  return await axios({
    url,
    data,
    method,
  })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return { code: e.code, message: e.message, result: null };
    });
};

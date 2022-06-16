import axios from 'axios';

export default async (url, data, method = 'get', headers) => {
  return await axios({
    url,
    data,
    method,
    headers,
  })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return { code: e.code, message: e.message, result: null };
    });
};

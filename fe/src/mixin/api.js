import axios from 'axios';

export default async (method = 'get', url, data, headers) => {
  return await axios({
    method,
    url,
    data,
    headers,
  })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return { code: e.code, message: e.message, result: null };
    });
};

import axios from 'axios';

import NetworkError from '../errors/NetworkError';

/**
 * Axios Object
 */
const http = axios.create();

http.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    if (error.response) {
      return Promise.reject(error);
    } else {
      return Promise.reject(new NetworkError());
    }
  }
);

export { http };

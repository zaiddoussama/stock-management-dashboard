import axios from "axios";

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com' || process.env.RREACT_APP_BASE_URL,
  timeout: parseInt(process.env.REACT_APP_TIMEOUT || 5000),
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;

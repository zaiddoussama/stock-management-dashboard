import axios from "axios";
import { acquireSilentToken, getAccessToken } from "../services/auth/authService";

const instance = axios.create({
  baseURL: 'http://51.75.124.137:8081/api',
  timeout: parseInt(process.env.REACT_APP_TIMEOUT || 5000),
});

instance.interceptors.request.use(
  (config) => {
    if(isTokenExpired(getAccessToken())){
      acquireSilentToken({});
    }
    config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const isTokenExpired = (token) => {
  const decode = JSON.parse(atob(token.split('.')[1]));
  return decode.exp * 1000 < new Date().getTime();
}

export default instance;

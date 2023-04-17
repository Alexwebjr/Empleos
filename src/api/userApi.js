import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { VITE_API_URL } = getEnvVariables();

const userApi = axios.create({
  baseURL: VITE_API_URL,
});

//Config interceptores
userApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  return config;
});

export default userApi;

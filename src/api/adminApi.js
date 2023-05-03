import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { VITE_API_URL } = getEnvVariables();

const adminApi = axios.create({
  baseURL: VITE_API_URL,
});

//Config interceptores
adminApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  return config;
});

export default adminApi;

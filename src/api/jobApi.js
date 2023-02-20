import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { VITE_API_URL } = getEnvVariables();

const jobApi = axios.create({
  baseURL: VITE_API_URL,
});

//TODO: config interceptores
jobApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    jwt: localStorage.getItem('token'),
  };
  return config;
});

export default jobApi;

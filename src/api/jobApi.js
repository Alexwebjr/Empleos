import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { VITE_API_URL } = getEnvVariables();

const jobApi = axios.create({
  baseURL: VITE_API_URL,
});

//TODO: config interceptores

export default jobApi;

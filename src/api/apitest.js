import axios from 'axios';

const apitest = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

//TODO: config interceptores

export default apitest;

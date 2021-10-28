import axios from 'axios';

export const instance = axios.create({
  // baseURL: 'http://192.168.43.50:3000/api', //mac
  baseURL: 'http://192.168.56.1:3000/api', //win
  timeout: 3000,
});

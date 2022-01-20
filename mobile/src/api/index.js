import axios from 'axios';

export const SERVER_HTTP_PROTOCOL = 'https://';
export const SERVER_WS_PROTOCOL = 'wss://';
export const SERVER_DOMAIN = 'localhost:3000';
export const SERVER_API_ENDPOINT = '/api';

export const instance = axios.create({
  baseURL: 'http://192.168.43.50:3000/api', //mac
  // baseURL: 'http://localhost:3000/api', //mac
  // baseURL: 'http://192.168.1.87:3000/api', //mac
  // baseURL: 'http://192.168.56.1:3000/api', //win
  timeout: 30000,
});

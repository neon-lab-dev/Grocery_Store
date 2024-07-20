import axios from 'axios';
import {getToken} from './localstorage';
import Config from 'react-native-config';

const BASE_URL =
  process.env.NODE_ENV === 'prod'
    ? process.env.REACT_APP_PROD_BASE_URL
    : process.env.REACT_APP_LOCAL_BASE_URl;

export const APIClient = axios.create({
  baseURL: "https://api.kaserag.com/login/",
  headers: {'Content-Type': 'application/json', 'Accept-Encoding': 'gzip'},
});

APIClient.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.log('Error Response:', error.response);
  return Promise.reject(error);
});

// FOR AUTHENTICATED ROUTES
// TOKEN TO BE EXTRACTED FROM STORE
const AuthAPIClient = axios.create({
  baseURL:"https://api.kaserag.com/",
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
  },
});

AuthAPIClient.interceptors.request.use(
  async config => {
    const storedToken = await getToken();
    const token = JSON.parse(storedToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log(token);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const AuthAPIClient2 = axios.create({
  baseURL: "https://api.kaserag.com/login/",
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
  },
});

AuthAPIClient2.interceptors.request.use(
  async config => {
    const storedToken = await getToken();
    const token = JSON.parse(storedToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export {AuthAPIClient, AuthAPIClient2};
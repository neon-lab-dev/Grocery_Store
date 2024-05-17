import axios from 'axios';
import {getToken} from './localstorage';
import {useState} from 'react';

const BASE_URL =
  process.env.NODE_ENV === 'prod'
    ? process.env.REACT_APP_PROD_BASE_URL
    : process.env.REACT_APP_LOCAL_BASE_URl;

export const APIClient = axios.create({
  baseURL: 'http://10.0.2.2:8801/v1',
  headers: {'Content-Type': 'application/json', 'Accept-Encoding': 'gzip'},
});

// FOR AUTHENTICATED ROUTES
// TOKEN TO BE EXTRACTED FROM STORE
const AuthAPIClient = axios.create({
  baseURL: 'http://10.0.2.2:8802/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
  },
});
const AuthAPIClient2 = axios.create({
  baseURL: 'http://10.0.2.2:8801/v1',
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
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
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

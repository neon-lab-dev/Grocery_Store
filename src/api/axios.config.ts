import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'prod'
    ? process.env.REACT_APP_PROD_BASE_URL
    : process.env.REACT_APP_LOCAL_BASE_URl;

export const APIClient = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json', 'Accept-Encoding': 'gzip'},
});

// FOR AUTHENTICATED ROUTES
// TOKEN TO BE EXTRACTED FROM STORE
// export const AuthAPIClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept-Encoding': 'gzip',
//     'Authorization': `Bearer ${token}`,
//   },
// });

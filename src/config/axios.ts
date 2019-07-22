import axios from 'axios';

const appID = "n7qRj7CRyw95mYj74MibyAQP"
const appSecret = "BGABgu6mAS4HqCjRRGb25Lie"

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  const xToken = localStorage.getItem('x-token')
  if (xToken) {
    config.headers.Authorization = `Bearer ${xToken}`
  }
  return config;

}, (error) => {

  // tslint:disable-next-line: no-console
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor

instance.interceptors.response.use((response) => {
  // Do something with response data
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token'])
  }
  return response;

}, (error) => {
  // Do something with response error
  return Promise.reject(error);
});

export default instance
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://5db92ead177b350014ac80d2.mockapi.io/transList/',
});

export default instance;

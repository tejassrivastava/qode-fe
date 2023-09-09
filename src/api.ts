import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://qode-be.onrender.com', // Replace with your backend API URL
});

export default instance;

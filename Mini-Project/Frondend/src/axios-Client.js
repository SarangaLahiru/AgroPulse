import axios from 'axios';

const axioaClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API base URL
});

export default axioaClient;
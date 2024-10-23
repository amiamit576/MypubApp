
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Change the URL to your backend API URL
  withCredentials: true, // Ensure cookies (like your auth token) are sent with requests
});

export default axiosInstance;

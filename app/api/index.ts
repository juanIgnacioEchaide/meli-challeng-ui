
import axios from 'axios';
import { saveTokens, getAccessToken, getRefreshToken } from '../lib/authService';

const API_URL = 'https://api.mercadolibre.com/';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_URL}oauth/token`, { refresh_token: refreshToken });
    const { access_token, refresh_token: newRefreshToken } = response.data;

    saveTokens({ access_token, refresh_token: newRefreshToken });
    return access_token;
  } catch (error) {
    console.error("Error al refrescar el token", error);
    throw error;
  }
};

axiosClient.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const refreshToken = await getRefreshToken();
        if (refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken); 
  
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default axiosClient;

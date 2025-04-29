import axios from "axios";
import { getAccessToken } from "../lib/authService";


const apiClient = axios.create({
  baseURL: "https://api.mercadolibre.com/",
});

apiClient.interceptors.request.use(async (config) => {
  console.log('interceptors')
  const token = await getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;

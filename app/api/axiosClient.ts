import axios from "axios";
import { checkAuthentication } from "../lib/authService";


const apiClient = axios.create({
  baseURL: "https://api.mercadolibre.com/",
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const {token} = await checkAuthentication();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;

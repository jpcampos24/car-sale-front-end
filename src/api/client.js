import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_CONFIG } from "./config";

const client = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para añadir el token a cada petición
client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;

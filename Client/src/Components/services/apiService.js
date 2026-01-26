
import axios from "axios";
import { API_BASE_URL } from "../constants/APIConstant";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {

    config.headers.Authorization = `Bearer ${token}`;

  }
  return config;

});

export default api;

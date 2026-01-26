import axios from "axios";
import { API_BASE_URL } from "../constants/APIConstant.js";

export const login = async (formData) => {

  return await axios.post(`${API_BASE_URL}/login`, formData);
  
};
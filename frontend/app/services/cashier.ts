// src/services/cashierService.ts

import axios from 'axios';
import Cookies from 'js-cookie'; 

const API_URL = "http://localhost:5600";

const getAuthHeader = () => {
    const token = Cookies.get('authToken'); 
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const cashierService = {
  // Correctly use a GET request with params
  async getProductByName(name: string) {
    const response = await axios.get(
      `${API_URL}/cashier/getProduct/${name}`, // Assuming this is your new endpoint
      {
        headers: getAuthHeader(),
      }
    );
    return response;
  },
};
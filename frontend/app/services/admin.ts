import axios from 'axios';
import Cookies from 'js-cookie'; // Assuming you've switched to js-cookie for best practice

const API_URL = "http://localhost:5600";

// 1. Create a helper function to get the auth header
const getAuthHeader = () => {
    // Check for the token in the cookie 
    const token = Cookies.get('authToken'); 
    // const token = localStorage.getItem('authToken'); // Alternative for localStorage

    // Return the header object if a token exists
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminService = {
  async addProduct(productData: {
    name: string,
    price: number,
    sku: string,
    category: string,
    stock: number,
    costPrice: number
  }) {
    // 2. Add the headers object to the axios request
    const response = await axios.post(
      `${API_URL}/admin/addNewProduct`, 
      productData, 
      {
        headers: getAuthHeader(), // bearertoken now going into header
      }
    );
    
    return response.data;
  },

  async getProducts(){
    const response = await axios.get(
      `${API_URL}/admin/getProducts`,
      {
        headers: getAuthHeader()
      }
    )
    return response.data
  }
};


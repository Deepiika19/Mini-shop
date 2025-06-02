import axios from 'axios';

// const api =process.env.REACT_APP_API_BASE_URL;
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
    return response?.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
 
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
    return response?.data || null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getProducts = () => api.get('products/');
export const getProductBySlug = (slug) => api.get(`products/${slug}/`);
export const getLeadershipMessages = () => api.get('leadership/');
export const getCompanyInfo = () => api.get('company-info/');

export default api;

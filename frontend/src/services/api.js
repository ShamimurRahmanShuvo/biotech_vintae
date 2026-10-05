import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/';
export const API_ORIGIN = new URL(API_BASE_URL).origin;

export const getMediaUrl = (path) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});


export const getProducts = () => api.get('products/');
export const getProductBySlug = (slug) => api.get(`products/${encodeURIComponent(slug)}/`);
export const getLeadershipMessages = () => api.get('leadership/');
export const getCompanyInfo = () => api.get('company-info/');

export default api;

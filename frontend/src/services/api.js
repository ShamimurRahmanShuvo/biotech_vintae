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

// DRF may return either a raw array or a paginated response: { results: [] }.
// Normalize both forms so React components can safely use .map().
const asArray = (response) => {
  const payload = response?.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (payload && typeof payload === 'object') return [payload];
  return [];
};

export const getProducts = async () => {
  const response = await api.get('products/');
  return { ...response, data: asArray(response) };
};

export const getProductBySlug = (slug) =>
  api.get(`products/${encodeURIComponent(slug)}/`);

export const getLeadershipMessages = async () => {
  const response = await api.get('leadership/');
  return { ...response, data: asArray(response) };
};

export const getCompanyInfo = async () => {
  const response = await api.get('company-info/');
  return { ...response, data: asArray(response) };
};

export default api;

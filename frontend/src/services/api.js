import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/';
export const API_ORIGIN = new URL(API_BASE_URL, window.location.origin).origin;

export const getMediaUrl = (path) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
};

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000,
});

const unwrap = (payload) => payload?.data ?? payload;

// DRF may return either a raw array or a paginated response: { results: [] }.
// Normalize both forms so React components can safely use .map().
const asArray = (payload) => {
    const value = unwrap(payload);
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.results)) return value.results;
    return [];
};

export const getProducts = async () => {
    const response = await api.get('products/');
    return asArray(response.data);
};

export const getProductBySlug = (slug) =>
    api.get(`products/${encodeURIComponent(slug)}/`);

export const getLeadershipMessages = async () => {
    const response = await api.get('leadership/');
    return asArray(response.data);
};

export const getCompanyInfo = async () => {
    const response = await api.get('company-info/');
    const records = asArray(response.data);
    return records[0] || null;
};

export default api;

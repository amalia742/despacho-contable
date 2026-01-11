import axios from 'axios';

const base = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: base + '/api', // ajusta si usas otro prefijo, p.e. '/auth' o ''
  withCredentials: false,
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;

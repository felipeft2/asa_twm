// services/api.js
import axios from 'axios';

// Base configuration for API
const API_BASE_URL = 'http://localhost:8080/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User/Authentication services
export const userService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/usuarios', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/usuarios/login", credentials);
      // Store auth token if returned by backend
      if (response.data.id) {
        localStorage.setItem('authToken', response.data.id);
      }
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/usuarios/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get all users (admin functionality)
  getAllUsers: async () => {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export const favoritoService = {

  getAllFavorites: async () => {
    try {
      const response = await api.get('/Favoritos');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getFavoriteById: async (id) => {
    try {
      const response = await api.get(`/Favoritos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  addFavorite: async (favoriteData) => {
    try {
      const response = await api.post('/Favoritos', favoriteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateFavorite: async (id, favoriteData) => {
    try {
      const response = await api.put(`/Favoritos/${id}`, favoriteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteFavorite: async (id) => {
    try {
      await api.delete(`/Favoritos/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export const treinoService = {
  getAll: async () => {
    const res = await api.get('/Treinos');
    return res.data;
  },
  getAllWithExercises: async () => {
    const res = await api.get('/Treinos/comExercicios');
    return res.data;
  },
  createWithExercises: async (payload) => {
    const res = await api.post('/Treinos/comExercicios', payload);
    return res.data;
  },
  getExercises: async () => {
    const res = await api.get('/Exercicios');
    return res.data;
  }
};
  
export default api;
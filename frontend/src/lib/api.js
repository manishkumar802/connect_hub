import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api/v1`;

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/user/register', userData),
  login: async (credentials) => {
    const response = await api.post('/user/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  logout: () => {
    localStorage.removeItem('token');
    return api.get('/user/logout');
  },
  getProfile: (userId) => api.get(`/user/${userId}/profile`),
  editProfile: (formData) => api.post('/user/profile/edit', formData),
  getSuggestedUsers: () => api.get('/user/suggested'),
  followUnfollow: (userId) => api.post(`/user/followorunfollow/${userId}`)
};

// Post APIs
export const postAPI = {
  createPost: (formData) => api.post('/post/addpost', formData),
  getAllPosts: () => api.get('/post/all'),
  getUserPosts: () => api.get('/post/userpost/all'),
  likePost: (postId) => api.get(`/post/${postId}/like`),
  dislikePost: (postId) => api.get(`/post/${postId}/dislike`),
  addComment: (postId, text) => api.post(`/post/${postId}/comment`, { text }),
  getComments: (postId) => api.post(`/post/${postId}/comment/all`),
  deletePost: (postId) => api.delete(`/post/delete/${postId}`),
  bookmarkPost: (postId) => api.get(`/post/${postId}/bookmark`)
};

// Message APIs
export const messageAPI = {
  sendMessage: (receiverId, textMessage) => api.post(`/message/send/${receiverId}`, { textMessage }),
  getMessages: (receiverId) => api.get(`/message/all/${receiverId}`)
};

export default api;
import axios from 'axios';

export const serverUrl = 'http://localhost:9000';

const api = axios.create({
    baseURL: serverUrl,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
})

export default api;
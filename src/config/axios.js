import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
});

axios.interceptors.response.use((response) => response, (error) => {
    if(error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('isLogin');
        alert('You are not authorized, now there will be a redirect to the authorization page.');
        window.location = '/signup/'
    }
})
import axios from 'axios';

export const instance = axios.create({
    baseURL: `https://ppostit-backend-server.onrender.com/api`
})
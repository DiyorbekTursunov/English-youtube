import axios from 'axios'


// Set config defaults when creating the instance
export const baseUrlAxios = axios.create({
    baseURL: 'https://youtube-kids-backend.onrender.com/'
});
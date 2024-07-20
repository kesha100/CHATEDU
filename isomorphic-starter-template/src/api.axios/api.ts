import axios from "axios";

export const apiService = axios.create({
    // baseURL: 'https://front.dzawj2e4iqic4.amplifyapp.com/',
    baseURL: 'http://localhost:3000/',
    // baseURL: 'https://front.d39fjnjgbjikf2.amplifyapp.com/'
})
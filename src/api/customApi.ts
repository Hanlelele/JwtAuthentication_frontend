// import axios from 'axios';
// // const customAxios = axios.create({
// //     baseURL: 'https://jwt-authentication-backend-git-main-hanleleles-projects.vercel.app/',
// //     headers: {
// //         'Content-Type': 'application/json',
// //         'Access-Control-Allow-Origin': '*',
// //     },
// // });

// // customAxios.defaults.withCredentials = true;
// const customAxios = axios.create({
//     baseURL: 'https://jwt-authentication-backend.vercel.app/',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true, // Ensure withCredentials is enabled to send cookies
// });

// customAxios.interceptors.request.use(
//     function (config) {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     },
// );

// export default customAxios;

import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'https://jwt-authentication-backend.vercel.app/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensure withCredentials is enabled to send cookies
});

customAxios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Handle request error
        return Promise.reject(error);
    },
);

customAxios.interceptors.response.use(
    function (response) {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx causes this function to trigger
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error, e.g., redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);

export default customAxios;

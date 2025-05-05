// import axios from "axios";

// export const API_BASE_URL = "http://localhost:5007";

// const jwt = localStorage.getItem("jwt");

// export  const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${jwt}`,
//     "Content-Type": "application/json",
//   },
// });

import axios from "axios";

export const API_BASE_URL = "http://localhost:5007";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT
api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    console.log("JWT Token: ", jwt);

    if (jwt) {
      // config.headers.Authorization = `Bearer ${jwt}`;
      config.headers.Authorization = `${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

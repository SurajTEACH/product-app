// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://product-app-64xm.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

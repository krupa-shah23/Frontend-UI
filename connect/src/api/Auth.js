import axios from "axios";
import Cookies from "js-cookie";

const AUTH_API = axios.create(
{
  baseURL: "https://task4-authdb.onrender.com/auth",
  headers: 
  {
    "Content-Type": "application/json",
  },
});


AUTH_API.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) 
  {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const loginUser = (data) => AUTH_API.post("/login", data);
export const registerUser = (data) => AUTH_API.post("/register", data);
export const getMe = () => AUTH_API.get("/me");
export const getAllUsers = () => AUTH_API.get("/all");

import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "https://task4-authdb.onrender.com/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const token = Cookies.get("token");

  if (
    token &&
    !req.url.includes("/login") &&
    !req.url.includes("/register")
  ) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const getMe = () => API.get("/me");
export const getAllUsers = () => API.get("/all");

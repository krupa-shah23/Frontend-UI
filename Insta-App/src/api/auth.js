// // // // import axios from "axios";


// // // // const AUTH_API = axios.create({
// // // //   baseURL: "https://task4-authdb.onrender.com",
// // // //   withCredentials: true,
// // // //   headers: {
// // // //     "Content-Type": "application/json",
// // // //   },
// // // // });


// // // // const PUBLIC_API = axios.create({
// // // //   baseURL: "https://task4-authdb.onrender.com",
// // // //   headers: {
// // // //     "Content-Type": "application/json",
// // // //   },
// // // // });


// // // // export const registerUser = (data) =>
// // // //   AUTH_API.post("/auth/register", data);

// // // // export const loginUser = (data) =>
// // // //   AUTH_API.post("/auth/login", data);

// // // // export const getMe = () =>
// // // //   AUTH_API.get("/auth/me");


// // // // export const getAllUsers = () =>
// // // //   PUBLIC_API.get("/auth/all");


// // // import axios from "axios";

// // // const AUTH_API = axios.create({
// // //   baseURL: "https://task4-authdb.onrender.com/auth",
// // //   withCredentials: true,
// // //   headers: {
// // //     "Content-Type": "application/json",
// // //   },
// // // });

// // // const PUBLIC_API = axios.create({
// // //   baseURL: "https://task4-authdb.onrender.com/auth",
// // //   headers: {
// // //     "Content-Type": "application/json",
// // //   },
// // // });

// // // export const registerUser = (data) => AUTH_API.post("/register", data);
// // // export const loginUser = (data) => AUTH_API.post("/login", data);
// // // export const getMe = () => AUTH_API.get("/me");
// // // export const getAllUsers = () => PUBLIC_API.get("/all");


// // import axios from "axios";

// // const API = axios.create({
// //   baseURL: "https://task4-authdb.onrender.com",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // /* ---------- AUTH ---------- */
// // export const registerUser = (data) =>
// //   API.post("/auth/register", data);

// // export const loginUser = (data) =>
// //   API.post("/auth/login", data);

// // export const getMe = () =>
// //   API.get("/auth/me");

// // /* -------- DISCOVER -------- */
// // export const getAllUsers = () =>
// //   API.get("/auth/all");


// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://task4-authdb.onrender.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* ---------- AUTH ---------- */
// export const registerUser = (data) =>
//   API.post("/auth/register", data);

// export const loginUser = (data) =>
//   API.post("/auth/login", data);

// export const getMe = () =>
//   API.get("/auth/me");

// export const getAllUsers = () =>
//   API.get("/auth/all");


import Cookies from "js-cookie";

const BASE = "https://task4-authdb.onrender.com/auth";

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function registerUser(data) {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function loginUser(data) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function getMe() {
  const token = Cookies.get("token");
  if (!token) throw new Error("No token");

  const res = await fetch(`${BASE}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await handleResponse(res);
  return data.user;
}

export async function getAllUsers() {
  const token = Cookies.get("token");
  const res = await fetch(`${BASE}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await handleResponse(res);
  return data.users;
}

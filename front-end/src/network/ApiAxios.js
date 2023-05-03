import axios from "axios";
import config from "../config";

// const https = require('https');
//
// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });

const instance = axios.create({
  baseURL: config.WS_BASE_URL,
});

const haha = axios.create({
  baseURL: config.FR_BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? token : "";
  config.headers.ContentType = "application/json";
  return config;
});

export const getAll = async () => await instance.post("users/all");

export const register = async (name, email, password, phone, agency, role) =>
  await instance.post("users/register", {
    name,
    email,
    password,
    phone,
    agency,
    role,
  });

export const confirmRegister = async (id) =>
  await instance.post(`users/confirm/${id}`);

export const forgotPassword = async (email) =>
  await instance.post("users/forgotpassword", { email });

export const confirmReset = async (id, password) =>
  await instance.post(`users/resetpass/${id}`, { password });

export const login = async (email, password) =>
  await instance.post("users/login", { email, password });

export const logout = async (token) =>
  await instance.post("users/logout", { token });

export const edit = async (userID, name, email) =>
  await instance.post("/users/edit", { userID, name, email });

export const getAllUsers = async () => await haha.get("/user/getAllUsers");

export const getAllMessages = async () => await haha.get("/message/getMessage");

export const deleteUser = async (id) => await haha.delete(`/user/delete/${id}`);

export const getAllCategorie = async () =>
  await haha.get("/category/getAllCategorie");

export const deleteCategory = async (id) =>
  await haha.delete(`/category/delete/${id}`);

import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

export const logIn = (data) => API.post("/auth/login", data);
export const signUp = (data) => API.post("/auth/register", data);
export const getLogginUser = (data) => API.get("/auth");
export const updateUser = (data) => API.put("/auth", data);
export const fetchSingleProfile = (data) => API.get(`/api/${data}`);
export const updateUserPhoto = (data) => API.post("/auth/photo", data);

export default API;

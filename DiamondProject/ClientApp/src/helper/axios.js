import axios from "axios";
import useAuth from "../hooks/useAuth";

const BASE_URL = "https://localhost:7022/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;

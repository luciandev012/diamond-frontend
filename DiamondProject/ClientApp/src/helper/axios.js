import axios from "axios";

const BASE_URL = "https://localhost:7022/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;

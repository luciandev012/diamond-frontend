import axios from "axios";

const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "https://localhost:7022/api/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosInstance;

import axiosInstance from "../helper/axios";

export const getBrands = () => axiosInstance.get("/brand");

export const addBrands = (model) => axiosInstance.post("/brand", model);

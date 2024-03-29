import axiosInstance from "../helper/axios";

export const getBrands = () => axiosInstance.get("/ringbrand/brand");

export const addBrands = (model) =>
  axiosInstance.post("ringbrand/brand", model);

export const deleteBrand = (id) =>
  axiosInstance.delete(`/ringbrand/brand/${id}`);

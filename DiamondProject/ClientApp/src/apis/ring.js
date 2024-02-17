import axiosInstance from "../helper/axios";

export const getRings = () => axiosInstance.get("/ring");

export const deleteRing = (id) => axiosInstance.delete(`/ring/${id}`);

export const addRing = (data) => axiosInstance.post("/ring", data);

export const getRing = (id) => axiosInstance.get(`/ring/${id}`);

export const getRingCategories = () => axiosInstance.get("/ring/ring-category");

export const deleteCategory = (id) =>
  axiosInstance.delete(`/ring/ring-category/${id}`);

export const addRingCategory = (data) =>
  axiosInstance.post("/ring/ring-category", data);

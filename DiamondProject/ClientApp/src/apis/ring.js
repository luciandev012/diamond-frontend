import axiosInstance from "../helper/axios";

export const getRings = () => axiosInstance.get("/ring");

export const deleteRing = (id) => axiosInstance.delete(`/ring/${id}`);

export const addRing = (data) => axiosInstance.post("/ring", data);

export const getRing = (id) => axiosInstance.get(`/ring/${id}`);

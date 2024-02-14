import axiosInstance from "../helper/axios";

export const getRings = () => axiosInstance.get("/ring");

export const deleteRing = (id) => axiosInstance.delete(`/ring/${id}`);

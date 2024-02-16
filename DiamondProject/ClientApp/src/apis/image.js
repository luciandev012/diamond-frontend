import axiosInstance from "../helper/axios";

export const getImage = (fileName) => axiosInstance.get(`/image/${fileName}`);

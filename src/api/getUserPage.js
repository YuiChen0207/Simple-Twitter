import axiosInstance, { baseUrl } from "./axiosInstance";

export const getUserPageById = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error("[Get User by ID failed]: ", error);
  }
};

import axiosInstance, { baseUrl } from "./axiosInstance";

export const getUserEdit = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}/edit`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get User Edit failed]: ", error);
  }
};

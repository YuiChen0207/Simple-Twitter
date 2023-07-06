import axiosInstance, { baseUrl } from './axiosInstance';

export const getPopularList = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/top`);
    return res.data.topUsers;
  } catch (error) {
    console.error('[Get getPopularList failed]: ', error);
  }
};

export const likePopularCard = async (followerId) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/followships`, {
      id: `${followerId}`,
    });
    return res.data;
  } catch (error) {
    console.error('[Like PopularCard failed]: ', error);
  }
};

export const unlikePopularCard = async (followerId) => {
  try {
    const res = await axiosInstance.delete(
      `${baseUrl}/followships/${followerId} `
    );
    return res.data;
  } catch (error) {
    console.error('[Unlike PopularCard failed]: ', error);
  }
};

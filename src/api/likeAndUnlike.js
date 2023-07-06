import axiosInstance, { baseUrl } from "./axiosInstance";

export const likeTweet = async (tweetId) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/${tweetId}/like`);
    return res.data;
  } catch (error) {
    console.error("[Like Tweet failed]: ", error);
    throw error;
  }
};

export const unlikeTweet = async (tweetId) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/${tweetId}/unlike`);
    return res.data;
  } catch (error) {
    console.error("[Unlike Tweet failed]: ", error);
    throw error;
  }
};

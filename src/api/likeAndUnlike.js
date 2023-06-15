import axios from "axios";

const baseUrl = "https://infinite-dawn-77240.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export const likeTweet = async (tweetId) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/${tweetId}/like`);
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.error("[Like Tweet failed]: ", error);
    throw error;
  }
};

export const unlikeTweet = async (tweetId) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/${tweetId}/unlike`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Unlike Tweet failed]: ", error);
    throw error;
  }
};

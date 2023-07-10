import axios from 'axios';

const baseUrl = 'https://infinite-dawn-77240-7e9569f3eb3f.herokuapp.com/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export const getUsersByAdmin = async () => {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/admin/users`);
    // console.log(data);
    return data;
  } catch (error) {
    console.error('[Get Users failed]: ', error);
  }
};

export const getTweetsByAdmin = async () => {
  try {
    const  res = await axiosInstance.get(`${baseUrl}/admin/tweets`);
    // console.log(res);
    return res.data.tweetsData;
  } catch (error) {
    console.error('[Get Tweets failed]: ', error);
  }
};

export const DeleteTweetByAdmin = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/admin/tweets/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    console.error('[Delete Tweet failed]: ', error);
  }
};

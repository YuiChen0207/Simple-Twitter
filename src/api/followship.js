import axios from 'axios';

const baseUrl = 'https://infinite-dawn-77240.herokuapp.com/api';

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

export const getFollowerList = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/followers`);
    return res.data;
  } catch (error) {
    console.error('[Get List failed]: ', error);
  }
};

export const getFollowingList = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/followings`);
    return res.data;
  } catch (error) {
    console.error('[Get List failed]: ', error);
  }
};

export const following = async ({ id }) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/followships`, { id });
    return res;
  } catch (error) {
    console.error('[Do followship failed]: ', error);
  }
};

export const unFollowing = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/followships/${id}`);
    return res;
  } catch (error) {
    console.error('[Delete followship failed]: ', error);
  }
};

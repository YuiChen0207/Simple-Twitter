import axios from 'axios';
const baseUrl = 'https://infinite-dawn-77240.herokuapp.com/api';

// 驗證區
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

export const getPopularlists = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/top`);
    console.log(res);
    return res.data.users;
  } catch (error) {
    console.error('[Get getPopularlist failed]: ', error);
  }
};

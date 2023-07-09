import axiosInstance, { baseUrl } from "./axiosInstance";
import Swal from "sweetalert2";

export const getUseSettingInfo = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/setting`);
    // console.log(res.data);
    return res;
  } catch (error) {
    console.error("[Get UseSettingInfo failed]: ", error);
  }
};

export const putUseSettingInfo = async (requestData) => {
  try {
    const res = await axiosInstance.put(
      `${baseUrl}/users/setting`,
      requestData
    );
    Swal.fire({
      position: "top",
      title: "Update successful!",
      timer: 1000,
      icon: "success",
      showConfirmButton: false,
    });
    return res;
  } catch (error) {
    Swal.fire({
      position: "top",
      title: "Update failed!",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: true,
    });
  }
};

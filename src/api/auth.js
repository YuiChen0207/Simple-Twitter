import axios from "axios";

const authURL = "https://infinite-dawn-77240-7e9569f3eb3f.herokuapp.com/api";

export const login = async ({ account, password }) => {
  try {
    const {
      data: { data },
    } = await axios.post(`${authURL}/users/signin`, {
      account,
      password,
    });

    const { token } = data;
    if (token) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error("[Login Failed]:", error);
    return { success: false, error };
  }
};

export const adminLogin = async ({ account, password }) => {
  try {
    const res = await axios.post(`${authURL}/admin/signin`, {
      account,
      password,
    });

    const { status } = res.data;
    if (status === "success") {
      return { success: true, ...res.data.data };
    }
    return res.data.data;
  } catch (error) {
    console.error("[Login Failed]:", error);
    console.log(error);
    return { success: false, error };
  }
};

export const register = async ({
  name,
  account,
  password,
  checkPassword,
  email,
}) => {
  try {
    const { data } = await axios.post(`${authURL}/users`, {
      name,
      account,
      password,
      checkPassword,
      email,
    });

    if (data) {
      return { success: true };
    }

    return data;
  } catch (error) {
    console.error("[Register Failed]: ", error.response.data.error);
    throw error.response.data.error;
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authURL}/test-token`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error("[Check Permission Failed]:", error);
  }
};

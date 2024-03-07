import axiosInstance from "../helper/axios";

export const login = (username, password) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post("/user/login", {
      username,
      password,
    });
    window.localStorage.setItem("accessToken", data);
    dispatch({ type: "USER_LOGIN", payload: data });
    return true;
  } catch (error) {
    return false;
  }
};

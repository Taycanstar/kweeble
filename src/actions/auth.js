import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index.js";

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.logIn(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error.response.data);
    console.log("hello error");
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error.response.data);
    console.log("hello error");
  }
};

export const fetchData = () => async (dispatch) => {
  try {
    const { data } = await api.getLogginUser();
    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log("hello error==>>", error.response.data);
    if (error?.response?.data?.name === "TokenExpiredError") {
      localStorage.removeItem('token');
      window.location.reload();
    }
  }
};

export const updateUser = (userData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(userData);
    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log("hello error==>>", error);
  }
};

export const updateUserPhoto = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUserPhoto(formData);
    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log("hello error==>>", error);
  }
};

import UserActionTypes from "./user.types";
import * as api from "../../api";

export const startGoogleSignIn = (result, token) => (dispatch) => {
  try {
    const data = { result, token };
    dispatch({ type: UserActionTypes.GOOGLE_AUTH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const startLogOut = () => (dispatch) => {
  try {
    dispatch({ type: UserActionTypes.LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

export const startEmailSignIn = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: UserActionTypes.EMAIL_LOGIN, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const startEmailSignUp = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: UserActionTypes.EMAIL_SIGNUP, payload: data });
  } catch (error) {
    console.log(error);
  }
};

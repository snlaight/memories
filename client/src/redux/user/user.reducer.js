import UserActionTypes from "./user.types";

const userReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case UserActionTypes.GOOGLE_AUTH:
    case UserActionTypes.EMAIL_LOGIN:
    case UserActionTypes.EMAIL_SIGNUP:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    case UserActionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default userReducer;

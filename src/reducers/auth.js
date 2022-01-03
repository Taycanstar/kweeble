import { AUTH, LOGOUT, SINGLE_PROFILE } from "../constants/actionTypes";

const authReducer = (state = { authData: {}, singleProfile: {} }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data };
      case SINGLE_PROFILE:
         return { ...state, singleProfile: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;

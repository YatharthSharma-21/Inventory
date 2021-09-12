import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
  UPDATE_USER,
} from "../constants/authTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: {},
  loading: true,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;

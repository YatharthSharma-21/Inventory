import { setAlert } from "./alertAction";
// import setAuthToken from "../../utils/setAuthToken";
import { startLoading, stopLoading } from "./loadingAction";

// import { loadNMCUser, authNMCUser, loadPartner, authPartner } from "../api";
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
} from "../constants/authTypes";
import { reset } from "./BPAction";

const loadUser = () => async (dispatch, getState) => {
  dispatch(startLoading(getState().loading.count));
  // if (localStorage.token) setAuthToken(localStorage.token);

  try {
    // const { data } = await loadNMCUser();
    let data = '';

    dispatch({ type: USER_LOADED, payload: data });
    dispatch(stopLoading(getState().loading.count));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(stopLoading(getState().loading.count));
  }
};

const signInUser = (email, password) => async (dispatch, getState) => {
  dispatch(startLoading(getState().loading.count));

  try {
    const formData = { email, password };
    // const { data } = await authNMCUser(formData);
    let data = {};

    if(email === 'sample@inventory.com' && password === '123456'){
      data = {isAuthenticated : true,user: "Admin"}
    }else{
      data = {isAuthenticated : false,user: ""}
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    dispatch(loadUser());
    dispatch(stopLoading(getState().loading.count));
  } catch (err) {
    console.log(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(stopLoading(getState().loading.count));
  }
};

// const loadPart = () => async (dispatch, getState) => {
//   dispatch(startLoading(getState().loading.count));
//   // if (localStorage.token) setAuthToken(localStorage.token);

//   try {
//     const { data } = await loadPartner();

//     dispatch({
//       type: USER_LOADED,
//       payload: data,
//     });
//     dispatch(stopLoading(getState().loading.count));
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//     console.log(err.response.data);
//     dispatch(stopLoading(getState().loading.count));
//   }
// };

// const signInPartner = (username, password) => async (dispatch, getState) => {
//   dispatch(startLoading(getState().loading.count));

//   try {
//     const formData = { username, password };
//     const { data } = await authPartner(formData);

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: data,
//     });

//     dispatch(loadPart());
//     dispatch(stopLoading(getState().loading.count));
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: LOGIN_FAIL,
//     });
//     dispatch(stopLoading(getState().loading.count));
//   }
// };

//Logout
const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(reset());
};

export { signInUser, logout };

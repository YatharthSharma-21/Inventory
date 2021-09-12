import { nanoid } from "nanoid";
import { SET_ALERT, REMOVE_ALERT } from "../constants/alertTypes";

const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = nanoid();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export { setAlert };

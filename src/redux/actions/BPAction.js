import { setAlert } from "./alertAction";
import { startLoading, stopLoading } from "./loadingAction";


import {
  CREATE_PARTNER,
  CREATE_PARTNER_ERROR, 
  RESET
} from "../constants/BPTypes";
import { UPDATE_USER } from "../constants/authTypes";

//@desc Create Partner
const createPartner = (formData, history) => async (dispatch, getState) => {
  dispatch(startLoading(getState().loading.count));

  try {
    // const { data } = await createPart(formData);
let data = '';
    dispatch({ type: CREATE_PARTNER, payload: data });
    dispatch(stopLoading(getState().loading.count));
    dispatch(setAlert("Partner Created Successfully", "success"));
    const partner = getState().BP.partner;
    history.push(`/admin/partner/${partner._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    console.log(err.response.data);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: CREATE_PARTNER_ERROR });
    dispatch(stopLoading(getState().loading.count));
  }
};

const reset = () => (dispatch) => {
  dispatch({ type: RESET });
};

export {
  createPartner, 
  reset 
};

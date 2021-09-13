import { setAlert } from "./alertAction";
import { startLoading, stopLoading } from "./loadingAction";


import {
  ADD_ITEM,
  ADD_ITEM_ERROR, 
  UPDATE_ITEM,
  UPDATE_ITEM_ERROR,
  RESET
} from "../constants/BPTypes";
import { UPDATE_USER } from "../constants/authTypes";

//@desc Add Item
const AddItems = (formData, history) => async (dispatch, getState) => {
  dispatch(startLoading(getState().loading.count));

  try {
    // const { data } = await createPart(formData);
let data = '';
    dispatch({ type: ADD_ITEM, payload: data });
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
    dispatch({ type: ADD_ITEM_ERROR });
    dispatch(stopLoading(getState().loading.count));
  }
};

//@desc Update Item
const updateItem = (id, formData) => async (dispatch, getState) => {
  dispatch(startLoading(getState().loading.count));

  const { role } = getState().auth.user;
  const isAdmin = role.includes("admin");

  console.log({ role, isAdmin });

  try {
    // const { data } = await updatePart(id, formData);
    let data = '';
    if (!isAdmin) dispatch({ type: UPDATE_USER, payload: data });
    else dispatch({ type: UPDATE_ITEM, payload: data });
    console.log("works");
    //   ? dispatch({ type: UPDATE_ITEM_ERROR, payload: data })
    //   : dispatch({ type: UPDATE_USER, payload: data });
    dispatch(setAlert("Partner Updated Successfully", "success"));
    dispatch(stopLoading(getState().loading.count));
  } catch (err) {
    const errors = err.response.data.errors;

    console.log(err.response.data);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: UPDATE_ITEM_ERROR });
    dispatch(stopLoading(getState().loading.count));
  }
};

const reset = () => (dispatch) => {
  dispatch({ type: RESET });
};

export {
  AddItems, 
  updateItem,
  reset 
};

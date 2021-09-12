import { setAlert } from "./alertAction";
import { startLoading, stopLoading } from "./loadingAction";

// import { setImg } from "../api";

const setImage = (formData, setImageData) => async (dispatch, getState) => {
  dispatch(startLoading(getState().loading.count));

  try {
    const { data } = await setImg(formData);

    dispatch(stopLoading(getState().loading.count));
    dispatch(setAlert("Uploaded Successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    dispatch(stopLoading(getState().loading.count));
  }
};

export { setImage };

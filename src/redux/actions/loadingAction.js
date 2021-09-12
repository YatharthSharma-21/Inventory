import { LOADING, LOADED, INITIAL_LOADING } from "../constants/loadingTypes";

const startLoading = (requestNo) => ({ type: LOADING, payload: requestNo + 1 });
const stopLoading = (requestNo) => ({ type: LOADED, payload: requestNo - 1 });
const intialLoading = () => (dispatch) =>
  setTimeout(() => dispatch({ type: INITIAL_LOADING }), 1000);

export { startLoading, stopLoading, intialLoading };

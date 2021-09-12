import { LOADING, LOADED, INITIAL_LOADING } from "../constants/loadingTypes";

const initialState = {
  initialLoading: true,
  isLoading: false,
  count: 0,
};

const loadingReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
        count: payload,
      };
    case LOADED:
      if (payload > 0) return { isLoading: true, count: payload };
      return { ...state, isLoading: false, count: 0 };
    case INITIAL_LOADING:
      return {
        ...state,
        initialLoading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;

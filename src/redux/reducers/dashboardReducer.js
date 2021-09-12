import { SET_SELECTED_SAMPLE_IDS } from "../constants/dashboardTypes";

const initialState = {
  selectedSampleIds: [],
};

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SELECTED_SAMPLE_IDS:
      return { ...state, selectedSampleIds: payload };

    default:
      return state;
  }
};

export default dashboardReducer;

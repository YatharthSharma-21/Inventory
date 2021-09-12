import { SET_SELECTED_SAMPLE_IDS } from "../constants/dashboardTypes";

const setSelectedSampleIds = (payload) => ({
  type: SET_SELECTED_SAMPLE_IDS,
  payload,
});

export { setSelectedSampleIds };

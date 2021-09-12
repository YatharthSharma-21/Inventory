import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import loadingReducer from "./loadingReducer";
import BPReducer from "./BPReducer";
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  BP: BPReducer,
  loading: loadingReducer,
  dashboard: dashboardReducer,
});

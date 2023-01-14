import { implementLocalStorage } from "./localStorageReducer";
import modalReducer from "../actions/modalSlice";
import unitStateReducer from "../actions/unitStatesSlice";
import userReduder from "../actions/userSlice";

const reducers = {
  localStorage: implementLocalStorage,
  unitStates: unitStateReducer,
  modal: modalReducer,
  user: userReduder,
};

export default reducers;

import modalReducer from "../actions/modalSlice";
import unitStateReducer from "../actions/unitStatesSlice";
import userReduder from "../actions/userSlice";

const reducers = {
  unitStates: unitStateReducer,
  modal: modalReducer,
  user: userReduder,
};

export default reducers;

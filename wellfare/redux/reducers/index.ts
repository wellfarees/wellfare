import { combineReducers } from "redux";
import { implementLocalStorage } from "./localStorageReducer";
import { unitStatesReducer } from "./unitStatesReducer";
import { initModalReducer } from "./initModalReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  localStorage: implementLocalStorage,
  unitStates: unitStatesReducer,
  modal: initModalReducer,
  user: userReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;

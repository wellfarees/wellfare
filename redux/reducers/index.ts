import { combineReducers } from "redux";
import { implementLocalStorage } from "./localStorageReducer";
import { unitStatesReducer } from "./unitStatesReducer";
import { initModalReducer } from "./initModalReducer";

const reducers = combineReducers({
  localStorage: implementLocalStorage,
  unitStates: unitStatesReducer,
  modal: initModalReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;

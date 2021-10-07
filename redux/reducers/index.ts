import { combineReducers } from "redux";
import { implementLocalStorage } from "./localStorageReducer";
import { unitStatesReducer } from "./unitStatesReducer";

const reducers = combineReducers({
  localStorage: implementLocalStorage,
  unitStates: unitStatesReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;

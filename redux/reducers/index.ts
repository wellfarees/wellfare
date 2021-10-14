import { combineReducers } from "redux";
import { implementLocalStorage } from "./localStorageReducer";
import { unitStatesReducer } from "./unitStatesReducer";
import { pointsIndicatorReducer } from "./pointsIndicatorReducer";

const reducers = combineReducers({
  localStorage: implementLocalStorage,
  unitStates: unitStatesReducer,
  point: pointsIndicatorReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;

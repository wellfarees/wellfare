import { combineReducers } from "redux";
import { implementLocalStorage } from "./localStorageReducer";

const reducers = combineReducers({
  localStorage: implementLocalStorage,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;

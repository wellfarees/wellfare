import { retrieveLocalStorage } from "../actions/actionCreators";
import { Action } from "../actions";
import { ActionType } from "../actions/actionTypes";
import produce from "immer";

type LocalStorageState = { [key: string]: string };
const initialState: LocalStorageState = {};

export const implementLocalStorage = produce(
  (state: LocalStorageState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.RETRIEVE_LOCAL_STORAGE:
        let item = localStorage.getItem(action.payload.key)!;
        state[action.payload.key!] = item;
        return state;

      case ActionType.SET_LOCAL_STORAGE:
        localStorage.setItem(action.payload.key, action.payload.value);
        state[action.payload.key!] = action.payload.value;
        return state;

      default:
        return state;
    }
  },
  initialState
);

import { produce } from "immer";
import { ActionType } from "../actions/actionTypes";
import { Action } from "../actions";

interface UnitStates {
  sidebarToggled: boolean;
  websiteLoaded: boolean;
}

const initialState: UnitStates = {
  sidebarToggled: false,
  websiteLoaded: false,
};

export const unitStatesReducer = produce(
  (state: UnitStates, action: Action) => {
    switch (action.type) {
      case ActionType.TOGGLE_SIDEBAR:
        state["sidebarToggled"] = action.payload.state;
        return state;

      case ActionType.SET_WEBSITE_LOADED:
        return {
          ...state,
          websiteLoaded: action.payload.loaded,
        };

      default:
        return state;
    }
  },
  initialState
);

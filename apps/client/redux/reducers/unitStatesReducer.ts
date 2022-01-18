import { produce } from "immer";
import { ActionType } from "../actions/actionTypes";
import { Action } from "../actions";

type UnitStates = { [key: string]: boolean };
const initialState: UnitStates = {
  sidebarToggled: false,
};

export const unitStatesReducer = produce(
  (state: UnitStates, action: Action) => {
    switch (action.type) {
      case ActionType.TOGGLE_SIDEBAR:
        state["sidebarToggled"] = action.payload.state;
        return state;

      default:
        return state;
    }
  },
  initialState
);

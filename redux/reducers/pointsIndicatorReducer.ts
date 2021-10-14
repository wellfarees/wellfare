import produce from "immer";
import { ActionType } from "../actions/actionTypes";
import { Action } from "../actions/index";

interface IndicatorState {
  currentPoint: string;
}

const initialState: IndicatorState = {
  currentPoint: "Home",
};

export const pointsIndicatorReducer = produce(
  (state: IndicatorState, action: Action) => {
    switch (action.type) {
      case ActionType.INDICATE_POINT:
        state.currentPoint = action.payload.activePoint;
        return state;

      default:
        return state;
    }
  },
  initialState
);

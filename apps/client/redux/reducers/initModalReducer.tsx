import { ActionType } from "../actions/actionTypes";
import { Action } from "../actions";

const initialState = {
  content: <></>,
  open: false,
};

export const initModalReducer = (
  state: { content?: JSX.Element; open: boolean } = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.INIT_MODAL:
      if (!action.payload.content) {
        state = { content: state.content, open: action.payload.open };
        return state;
      }

      return (state = action.payload);

    default:
      return state;
  }
};

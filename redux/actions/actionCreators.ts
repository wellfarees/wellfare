import {
  RetrieveLocalStorage,
  SetLocalStorage,
  ToggleSidebar,
  InitModal,
} from ".";
import { ActionType } from "./actionTypes";

export const retrieveLocalStorage = (key: string): RetrieveLocalStorage => {
  return {
    type: ActionType.RETRIEVE_LOCAL_STORAGE,
    payload: {
      key,
    },
  };
};

export const setLocalStorage = (
  key: string,
  value: string
): SetLocalStorage => {
  return {
    type: ActionType.SET_LOCAL_STORAGE,
    payload: {
      key,
      value,
    },
  };
};

export const toggleSidebar = (state: boolean): ToggleSidebar => {
  return {
    type: ActionType.TOGGLE_SIDEBAR,
    payload: {
      state,
    },
  };
};

export const initModal = (open: boolean, content?: JSX.Element): InitModal => {
  return {
    type: ActionType.INIT_MODAL,
    payload: {
      content,
      open,
    },
  };
};

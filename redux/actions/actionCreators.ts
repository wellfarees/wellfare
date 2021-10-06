import { RetrieveLocalStorage, SetLocalStorage } from ".";
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

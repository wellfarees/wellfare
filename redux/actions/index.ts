import { ActionType } from "./actionTypes";

export interface RetrieveLocalStorage {
  type: ActionType.RETRIEVE_LOCAL_STORAGE;
  payload: {
    key: string;
  };
}

export interface SetLocalStorage {
  type: ActionType.SET_LOCAL_STORAGE;
  payload: {
    key: string;
    value: string;
  };
}

export interface ToggleSidebar {
  type: ActionType.TOGGLE_SIDEBAR;
  payload: {
    state: boolean;
  };
}

export interface IndicatePoint {
  type: ActionType.INDICATE_POINT;
  payload: {
    activePoint: string;
  };
}

export type Action =
  | RetrieveLocalStorage
  | SetLocalStorage
  | ToggleSidebar
  | IndicatePoint;

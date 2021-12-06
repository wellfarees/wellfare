import {
  RetrieveLocalStorage,
  SetLocalStorage,
  ToggleSidebar,
  InitModal,
  StoreUser,
  SaveToken,
  SaveConfig,
} from ".";
import { UserSchema } from "../../graphql/schemas";
import { ActionType } from "./actionTypes";
import { UserConfig } from "../../config/userConfig";

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

// FIXME: figure out what to do with the id: string and reducedMotion | theme interferences
export const storeUser = (
  jwt: string,
  user: {
    id: number;
    config: {
      darkMode: boolean;
      fontSize: number;
      reducedMotion: boolean;
    };
  }
): StoreUser => {
  return {
    type: ActionType.STORE_USER,
    payload: {
      jwt,
      user,
    },
  };
};

export const saveToken = (jwt: string | null): SaveToken => {
  return {
    type: ActionType.SAVE_TOKEN,
    payload: jwt,
  };
};

export const logout = () => {
  return {
    type: ActionType.LOGOUT,
    payload: null,
  };
};

export const saveConfig = (config: UserConfig): SaveConfig => {
  return {
    type: ActionType.SAVE_CONFIG,
    payload: config,
  };
};

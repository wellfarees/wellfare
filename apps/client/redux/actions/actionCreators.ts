import {
  RetrieveLocalStorage,
  SetLocalStorage,
  ToggleSidebar,
  InitModal,
  StoreUser,
  SaveToken,
  SaveConfig,
  SetPfp,
  SetWebsiteLoaded,
  SetAffirmations,
} from ".";
import { ActionType } from "./actionTypes";
import { UserConfig } from "../../config/userConfig";
import { SIGNIN_METHODS } from "../../../../constants";

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
  type: SIGNIN_METHODS,
  jwt: string,
  user: {
    id: number;
    config: {
      darkMode: boolean;
      fontSize: number;
      reducedMotion: boolean;
    };
    pfp: null | string;
  }
): StoreUser => {
  return {
    type: ActionType.STORE_USER,
    payload: {
      type,
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

export const saveConfig = (config: Omit<UserConfig, "pfp">): SaveConfig => {
  return {
    type: ActionType.SAVE_CONFIG,
    payload: config,
  };
};

export const setPfp = (url: string | null): SetPfp => {
  return {
    type: ActionType.SET_PFP,
    payload: {
      url,
    },
  };
};

export function saveConfigPiece<Key extends keyof UserConfig>(
  config: Pick<UserConfig, Key>
): {
  type: ActionType.SAVE_CONFIG_PIECE;
  payload: { configPiece: Pick<UserConfig, Key> };
} {
  return {
    type: ActionType.SAVE_CONFIG_PIECE,
    payload: {
      configPiece: config,
    },
  };
}

export const setWebsiteLoaded = (loaded: boolean): SetWebsiteLoaded => {
  return {
    type: ActionType.SET_WEBSITE_LOADED,
    payload: {
      loaded,
    },
  };
};

export const setAffirmations = (affirmations: string): SetAffirmations => {
  return {
    type: ActionType.SET_AFFIRMATIONS,
    payload: {
      affirmations,
    },
  };
};

export interface ConfigPiece {
  data: Extract<ReturnType<typeof saveConfigPiece>, object>;
}

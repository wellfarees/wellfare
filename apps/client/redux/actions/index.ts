import { ActionType } from "./actionTypes";
import { UserConfig } from "../../config/userConfig";
import { SIGNIN_METHODS } from "../../../../constants";
import { ConfigPiece } from "./actionCreators";

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

export interface InitModal {
  type: ActionType.INIT_MODAL;
  payload: {
    content?: JSX.Element;
    open: boolean;
  };
}

export interface StoreUser {
  type: ActionType.STORE_USER;
  payload: {
    jwt: string;
    type: SIGNIN_METHODS;
    user: {
      config: {
        darkMode: boolean;
        reducedMotion: boolean;
        fontSize: number;
      };
      pfp: null | string;
      id: number;
    };
  };
}

export interface Logout {
  type: ActionType.LOGOUT;
  payload: null;
}

export interface SaveToken {
  type: ActionType.SAVE_TOKEN;
  payload: string | null;
}

export interface SaveConfig {
  type: ActionType.SAVE_CONFIG;
  payload: Omit<UserConfig, "pfp">;
}

export interface SetPfp {
  type: ActionType.SET_PFP;
  payload: {
    url: string;
  };
}

export interface SaveConfigPiece {
  type: ActionType.SAVE_CONFIG_PIECE;
  payload: {
    configPiece: ConfigPiece;
  };
}

export interface SetWebsiteLoaded {
  type: ActionType.SET_WEBSITE_LOADED;
  payload: {
    loaded: boolean;
  };
}

export interface SetAffirmations {
  type: ActionType.SET_AFFIRMATIONS;
  payload: {
    affirmations: string;
  };
}

export type Action =
  | RetrieveLocalStorage
  | SetLocalStorage
  | ToggleSidebar
  | InitModal
  | StoreUser
  | Logout
  | SaveToken
  | SaveConfig
  | SetPfp
  | SaveConfigPiece
  | SetWebsiteLoaded
  | SetAffirmations;

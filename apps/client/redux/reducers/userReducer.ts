import { ActionType } from "../actions/actionTypes";
import { Action } from "../actions";
import { transformFetchedConfig } from "../../utils/transformFetchedConfig";

type UserState = {
  info: {
    config: {
      theme: "light" | "dark";
      reducedMotion: boolean;
      fontSize: number;
    };
    id: number;
    pfp?: null | string;
    affirmations?: string;
  } | null;
  jwt: string | null;
};
const initialState: UserState = {
  info: {
    config: {
      fontSize: 14,
      reducedMotion: false,
      theme: "light",
    },
    pfp: null,
    id: 0,
    affirmations: null,
  },
  jwt: null,
};

export const userReducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionType.STORE_USER:
      // clear out the localstorage first
      localStorage.removeItem("jwt");
      localStorage.removeItem("sync-type");

      // store in local storage
      localStorage.setItem("jwt", action.payload.jwt);
      localStorage.setItem("sync-type", action.payload.type);

      // save to the global state
      return {
        info: {
          ...action.payload.user,
          config: transformFetchedConfig(action.payload.user.config),
          pfp: action.payload.user.pfp,
        },
        jwt: action.payload.jwt,
      };

    case ActionType.LOGOUT:
      localStorage.removeItem("jwt");
      localStorage.removeItem("sync-type");

      return initialState;

    case ActionType.SAVE_TOKEN:
      return { ...state, jwt: action.payload };

    case ActionType.SAVE_CONFIG:
      if (!state.info) {
        return {
          ...state,
          info: { id: 0, config: action.payload },
        };
      }

      return { ...state, info: { ...state.info, config: action.payload } };

    case ActionType.SET_PFP:
      return {
        ...state,
        info: {
          ...state.info,
          pfp: action.payload.url,
        },
      };
    case ActionType.SAVE_CONFIG_PIECE:
      return {
        ...state,
        info: {
          ...state.info,
          config: {
            ...state.info.config,
            ...action.payload.configPiece,
          },
        },
      };

    case ActionType.SET_AFFIRMATIONS:
      const { affirmations } = action.payload;
      return {
        ...state,
        info: {
          ...state.info,
          affirmations,
        },
      };

    default:
      return state;
  }
};

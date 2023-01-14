import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { SIGNIN_METHODS } from "../../../../constants";
import { transformFetchedConfig } from "../../utils/transformFetchedConfig";
import { UserConfig } from "../../config/userConfig";

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

interface UserInput {
  id: number;
  config: {
    darkMode: boolean;
    fontSize: number;
    reducedMotion: boolean;
  };
  pfp: null | string;
}

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

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    storeUser: (
      _state,
      action: PayloadAction<{
        type: SIGNIN_METHODS;
        jwt: string;
        user: UserInput;
      }>
    ) => {
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
    },

    logout: () => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("sync-type");

      return initialState;
    },

    saveToken: (state, action: PayloadAction<string>) => {
      return { ...state, jwt: action.payload };
    },

    saveConfig: (state, action: PayloadAction<Omit<UserConfig, "pfp">>) => {
      return (state = {
        ...state,
        info: { ...state.info, config: action.payload },
      });
    },

    saveConfigPiece: (state, action: PayloadAction<{ [key: string]: any }>) => {
      return (state = {
        ...state,
        info: {
          ...state.info,
          config: {
            ...state.info.config,
            ...action.payload,
          },
        },
      });
    },

    setPfp: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        info: {
          ...state.info,
          pfp: action.payload,
        },
      };
    },

    setAffirmations: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        info: {
          ...state.info,
          affirmations: action.payload,
        },
      };
    },
  },
});

export const {
  storeUser,
  logout,
  saveConfig,
  saveConfigPiece,
  saveToken,
  setAffirmations,
  setPfp,
} = userSlice.actions;
export default userSlice.reducer;

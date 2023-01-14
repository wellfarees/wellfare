import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UnitStates {
  sidebarToggled: boolean;
  websiteLoaded: boolean;
}

const initialState: UnitStates = {
  sidebarToggled: false,
  websiteLoaded: false,
};

export const unitStateSlice = createSlice({
  name: "unitState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebarToggled = action.payload;
    },
    setWebsiteLoaded: (state, action: PayloadAction<boolean>) => {
      state.websiteLoaded = action.payload;
    },
  },
});

export const { setWebsiteLoaded, toggleSidebar } = unitStateSlice.actions;

export default unitStateSlice.reducer;

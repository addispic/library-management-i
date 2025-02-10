import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// store
import { RootState } from "../../store";

// interface
type IInitialState = {
  menuId: string;
};

// initial state
const initialState: IInitialState = {
  menuId: "normal",
};

// menu
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuIdSetter: (state, action: PayloadAction<string>) => {
      state.menuId = action.payload;
    },
  },
});

// exports
// actions
export const { menuIdSetter } = menuSlice.actions;
// selectors
// menu id selector
export const menuIdSelector = (state: RootState) => state.menu.menuId;
// reducer
export default menuSlice.reducer;

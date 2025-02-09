import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// store
import {RootState} from '../../store'

// interfaces
// errors
export type IErrors = {
  username?: string[];
  email?: string[];
  password?: string[];
};

// initial state
type IInitialState = {
    errors: IErrors;
    formId: "login" | "signup" | "forget"
}

// initial state
const initialState: IInitialState = {
    errors: {},
    formId: "login"
};

// users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetErrors: (state)=> {
        state.errors = {}
    },
    setFormId: (state,action: PayloadAction<"login" | "signup" | "forget">) => {
        state.formId = action.payload
    },
    setErrors: (state,action: PayloadAction<IErrors>) => {
        state.errors = action.payload
    }
  },
});

// exports
// actions
export const {resetErrors,setFormId,setErrors} = usersSlice.actions
// selectors
// form id selector
export const formIdSelector = (state: RootState) => state.users.formId
// errors selector
export const errorsSelector = (state: RootState) => state.users.errors
// reducer
export default usersSlice.reducer;

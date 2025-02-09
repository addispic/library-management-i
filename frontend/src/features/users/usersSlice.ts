import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// store
import { RootState } from "../../store";

// interfaces
// user
export type IUser = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
};
// errors
export type IErrors = {
  username?: string[];
  email?: string[];
  password?: string[];
};

// initial state
type IInitialState = {
  errors: IErrors;
  formId: "login" | "signup" | "forget";
  user: IUser | null;
  isAuthenticating: boolean;
  checkingAuthentication: boolean;
};

// login
export const login = createAsyncThunk(
  "users/login",
  async (data: { username: string; password: string }) => {
    try {
      const response = await axios.post("/api/users/login", data);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { errors: { flag: "unexpected error has occurred, login" } };
      }
    }
  }
);

// signup
export const signup = createAsyncThunk(
  "users/signup",
  async (data: { username: string; email: string; password: string }) => {
    try {
      const response = await axios.post("/api/users/signup", data);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { errors: { flag: "unexpected error has occurred, login" } };
      }
    }
  }
);

// is user authenticated
export const isUserAuthenticated = createAsyncThunk(
  "users/isUserAuthenticated",
  async () => {
    try {
      const response = await axios.get("/api/users/is-authenticated");
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { errors: { flag: "unexpected error has occurred, login" } };
      }
    }
  }
);
// initial state
const initialState: IInitialState = {
  errors: {},
  formId: "login",
  user: null,
  isAuthenticating: false,
  checkingAuthentication: false,
};

// users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = {};
    },
    setFormId: (
      state,
      action: PayloadAction<"login" | "signup" | "forget">
    ) => {
      state.formId = action.payload;
    },
    setErrors: (state, action: PayloadAction<IErrors>) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // cases
      // signup
      .addCase(signup.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        if (action.payload?.newUser) {
          state.user = action.payload.newUser;
          state.errors = {};
        }
        if (action.payload.errors) {
          if (action.payload.errors?.username) {
            state.errors.username = [action.payload.errors?.username];
          }
          if (action.payload.errors?.email) {
            state.errors.email = [action.payload.errors?.email];
          }
          if (action.payload.errors?.password) {
            state.errors.password = [action.payload.errors?.password];
          }
          state.user = null;
        }
      })
      .addCase(signup.rejected, (state) => {
        state.isAuthenticating = false;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.errors = {};
        }
        if (action.payload.errors) {
          if (action.payload.errors?.username) {
            state.errors.username = [action.payload.errors?.username];
          }
          if (action.payload.errors?.email) {
            state.errors.email = [action.payload.errors?.email];
          }
          if (action.payload.errors?.password) {
            state.errors.password = [action.payload.errors?.password];
          }
          state.user = null;
        }
      })
      .addCase(login.rejected, (state) => {
        state.isAuthenticating = false;
      })
      // is user authenticated
      .addCase(isUserAuthenticated.pending, (state) => {
        state.checkingAuthentication = true;
      })
      .addCase(isUserAuthenticated.fulfilled, (state, action) => {
        state.checkingAuthentication = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(isUserAuthenticated.rejected, (state) => {
        state.checkingAuthentication = false;
      });
  },
});

// exports
// actions
export const { resetErrors, setFormId, setErrors } = usersSlice.actions;
// selectors
// form id selector
export const formIdSelector = (state: RootState) => state.users.formId;
// errors selector
export const errorsSelector = (state: RootState) => state.users.errors;
// is authenticating selector
export const isAuthenticatingSelector = (state: RootState) =>
  state.users.isAuthenticating;
// user selector
export const userSelector = (state: RootState) => state.users.user;
// checking authentication selector
export const checkingAuthenticationSelector = (state: RootState) =>
  state.users.checkingAuthentication;
// reducer
export default usersSlice.reducer;

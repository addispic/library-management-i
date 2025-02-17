import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// config
import { SOCKET } from "../../config";

// store
import { RootState } from "../../store";

// interfaces
// user
export type IUser = {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};
// online user
export type IOnlineUser = {
  _id: string;
  id: string;
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
  users: IUser[];
  isAuthenticating: boolean;
  checkingAuthentication: boolean;
  isUsersFetching: boolean;
  onlineUsers: IOnlineUser[];
  isMemberSelected: IUser | null;
  isUserRoleUpdating: boolean;
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

// update user role
export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async (data: { _id: string; role: string }) => {
    try {
      const { _id, role } = data;
      const response = await axios.put(`/api/users/update/${_id}`, { role });
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "user role update failed" };
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
// get users
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    } else {
      return { errors: { flag: "unexpected error has occurred, login" } };
    }
  }
});
// logout
export const logout = createAsyncThunk("users/logout", async () => {
  try {
    const response = await axios.get("/api/users/logout");
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    } else {
      return { errors: { flag: "unexpected error has occurred, login" } };
    }
  }
});
// initial state
const initialState: IInitialState = {
  errors: {},
  formId: "login",
  user: null,
  users: [],
  isAuthenticating: false,
  checkingAuthentication: false,
  isUsersFetching: false,
  onlineUsers: [],
  isMemberSelected: null,
  isUserRoleUpdating: false,
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
    setOnlineUsers: (state, action: PayloadAction<IOnlineUser[]>) => {
      state.onlineUsers = action.payload;
    },
    newUserSignupEvent: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    setIsMemberSelected: (state, action: PayloadAction<IUser | null>) => {
      state.isMemberSelected = action.payload;
    },
    userRoleUpdateEvent: (state, action) => {
      const { _id, role } = action.payload;
      const index = state.users.findIndex((usr) => usr._id === _id);
      if (index !== -1) {
        state.users[index].role = role;
        if (state.user) {
          state.user.role = role;
        }
        if (state.isMemberSelected) {
          state.isMemberSelected.role = role;
        }
      }
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
          state.users.push(action.payload.newUser);
          state.errors = {};
          SOCKET.emit("newUserSignup", action.payload.newUser);
          SOCKET.emit("newOnlineUser", action.payload.newUser);
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
          SOCKET.emit("newOnlineUser", action.payload.user);
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
          SOCKET.emit("newOnlineUser", action.payload.user);
        }
      })
      .addCase(isUserAuthenticated.rejected, (state) => {
        state.checkingAuthentication = false;
      })
      // get users
      .addCase(getUsers.pending, (state) => {
        state.isUsersFetching = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUsersFetching = false;
        if (action.payload.users) {
          state.users = action.payload.users;
        }
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUsersFetching = false;
      })
      // logout
      .addCase(logout.fulfilled, (state, action) => {
        if (action.payload.message === "user logged out successfully") {
          state.user = null;
          SOCKET.emit("removeOnlineUser");
        }
      })
      // update user role
      .addCase(updateUserRole.pending, (state) => {
        state.isUserRoleUpdating = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isUserRoleUpdating = false;
        if (action.payload.message === "user role updated successfully") {
          SOCKET.emit("userRoleUpdate", action.payload);
          const { _id, role } = action.payload;
          const index = state.users.findIndex((usr) => usr._id === _id);
          if (index !== -1) {
            console.log(state.users[index].role, role);
            state.users[index].role = role;
            if (state.isMemberSelected) {
              state.isMemberSelected.role = role;
            }
          }
        }
      })
      .addCase(updateUserRole.rejected, (state) => {
        state.isUserRoleUpdating = false;
      });
  },
});

// exports
// actions
export const {
  resetErrors,
  setFormId,
  setErrors,
  setOnlineUsers,
  newUserSignupEvent,
  setIsMemberSelected,
  userRoleUpdateEvent,
} = usersSlice.actions;
// selectors
// form id selector
export const formIdSelector = (state: RootState) => state.users.formId;
// errors selector
export const errorsSelector = (state: RootState) => state.users.errors;
// is authenticating selector
export const isAuthenticatingSelector = (state: RootState) =>
  state.users.isAuthenticating;
// is users fetching
export const isUsersFetchingSelector = (state: RootState) => state.users.isUsersFetching
// is member selected
export const isMemberSelectedSelector = (state: RootState) =>
  state.users.isMemberSelected;
// user selector
export const userSelector = (state: RootState) => state.users.user;
// checking authentication selector
export const checkingAuthenticationSelector = (state: RootState) =>
  state.users.checkingAuthentication;
// users selector
export const usersSelector = (state: RootState) => state.users.users;
// online users
export const onlineUsersSelector = (state: RootState) =>
  state.users.onlineUsers;
// reducer
export default usersSlice.reducer;

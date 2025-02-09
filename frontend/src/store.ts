import { configureStore } from "@reduxjs/toolkit";

// reducers
import users from "./features/users/usersSlice";

// store
export const store = configureStore({
  reducer: {
    users,
  },
});

// root state
export type RootState = ReturnType<typeof store.getState>;
// app dispatch
export type AppDispatch = typeof store.dispatch;

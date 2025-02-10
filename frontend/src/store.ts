import { configureStore } from "@reduxjs/toolkit";

// reducers
import users from "./features/users/usersSlice";
// menu
import menu from "./features/menu/menuSlice";

// store
export const store = configureStore({
  reducer: {
    users,
    menu,
  },
});

// root state
export type RootState = ReturnType<typeof store.getState>;
// app dispatch
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";

// reducers
import menu from "./features/menu/menuSlice";
import users from "./features/users/usersSlice";
import profiles from "./features/profiles/profilesSlice";
import books from "./features/books/booksSlice";
import borrows from './features/borrows/borrowsSlice'

// store
export const store = configureStore({
  reducer: {
    users,
    menu,
    profiles,
    books,
    borrows,
  },
});

// root state
export type RootState = ReturnType<typeof store.getState>;
// app dispatch
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";

// store
export const store = configureStore({
  reducer: {},
});

// root state
export type RootState = ReturnType<typeof store.getState>
// app dispatch
export type AppDispatch = typeof store.dispatch

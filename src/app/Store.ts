import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from "./FetchData";

export const store = configureStore({
  reducer: { fetchDataReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

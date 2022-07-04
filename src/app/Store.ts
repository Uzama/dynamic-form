import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from "./FetchData";
import sendFormReducer from "./SendForm";

export const store = configureStore({
  reducer: { fetchDataReducer, sendFormReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

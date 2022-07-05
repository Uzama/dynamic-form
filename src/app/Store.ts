import { configureStore } from "@reduxjs/toolkit";
import fetchFormReducer from "./FetchForm";
import sendFormReducer from "./SendForm";

export const store = configureStore({
  reducer: { fetchFormReducer, sendFormReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

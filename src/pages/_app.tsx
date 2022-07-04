import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { store } from "../app/Store";
import { Provider } from "react-redux";
import { fetchField } from "../app/FetchData";
import { useAppDispatch, useAppSelector } from "../app/hooks";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

import type { AppProps } from "next/app";
import { store } from "../app/Store";
import Head from "next/head";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "../components/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// source: https://github.com/mui/material-ui/tree/master/examples/nextjs-with-typescript
export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <CssBaseline />
        <Component {...pageProps} />
      </CacheProvider>
    </Provider>
  );
}

import { Button, LinearProgress, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Multiline, Selects, Text } from "../components/Fields";
import styles from "../styles/Home.module.css";
import { FieldTypes } from "../types/FetchData";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { select, fetchField, FetchDataStore } from "../app/FetchData";
import {
  resetStore,
  sendFormStore,
  sendFormData,
  SendFormStore,
} from "../app/SendForm";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const store: FetchDataStore = useAppSelector(select);

  const sendFStore: SendFormStore = useAppSelector(sendFormStore);

  useEffect(() => {
    dispatch(fetchField());
    dispatch(resetStore());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let body: { [k: string]: string | number | undefined } = {};

    store.data.forEach((data) => {
      body[data.fieldName] = data.value;
    });

    dispatch(sendFormData(body));
  };

  const renderForm = () => {
    if (store.isLoading) {
      return (
        <div className={styles.loading}>
          <LinearProgress color="success" />
          <span>building form...</span>
        </div>
      );
    }

    if (store.error.length != 0) {
      return (
        <div className={styles.error}>
          <span> building form failed::: {store.error}</span>
        </div>
      );
    }

    return (
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {store.data.map((data) => {
          switch (data.type) {
            case FieldTypes.TEXT:
            case FieldTypes.EMAIL:
            case FieldTypes.NUMBER: {
              return (
                <Text key={data.fieldName} data={data} dispatch={dispatch} />
              );
            }
            case FieldTypes.MULTILINE: {
              return (
                <Multiline
                  key={data.fieldName}
                  data={data}
                  dispatch={dispatch}
                />
              );
            }
            case FieldTypes.SELECT: {
              return (
                <Selects key={data.fieldName} data={data} dispatch={dispatch} />
              );
            }
          }
        })}

        <Button className={styles.button} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    );
  };

  const renderResponse = () => {
    if (sendFStore.response != null) {
      return (
        <div className={styles.response}>
          <hr className={styles.line}></hr>
          <h3 className={styles.title}>Response</h3>
          <pre>{JSON.stringify(sendFStore.response, null, 2)}</pre>
        </div>
      );
    }

    if (sendFStore.error.length != 0) {
      return (
        <div className={styles.error}>
          <span> sending data failed::: {sendFStore.error}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamic Form</title>
      </Head>
      <main className={styles.main}>
        <h2 className={styles.title}>Dynamic Form</h2>
        {sendFStore.isLoading ? (
          <div className={styles.loadingCircle}>
            <CircularProgress color="success" />
            <span>sending data...</span>
          </div>
        ) : (
          <>
            {renderForm()}
            {renderResponse()}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;

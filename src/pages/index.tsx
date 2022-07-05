import { Button, LinearProgress, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Multiline, Selects, Text } from "../components/Fields";
import styles from "../styles/Home.module.css";
import { FieldTypes } from "../types/FetchForm";
import { useAppDispatch, useAppSelector } from "../app/Hooks";
import {
  fetchFormSelect,
  fetchFormData,
  FetchFormStore,
} from "../app/FetchForm";
import {
  resetFormStore,
  sendFormSelect,
  sendFormData,
  SendFormStore,
} from "../app/SendForm";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  const fetchFormStore: FetchFormStore = useAppSelector(fetchFormSelect);
  const sendFormStore: SendFormStore = useAppSelector(sendFormSelect);

  useEffect(() => {
    dispatch(fetchFormData());
    dispatch(resetFormStore());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // build request body
    let body: { [k: string]: string | number | undefined } = {};

    fetchFormStore.fields.forEach((field) => {
      body[field.fieldName] = field.value;
    });

    dispatch(sendFormData(body));
  };

  // render form if isLoading and error is false.
  const renderForm = () => {
    if (fetchFormStore.isLoading) {
      return (
        <div className={styles.loading}>
          <LinearProgress color="success" />
          <span>building form...</span>
        </div>
      );
    }

    if (fetchFormStore.error.length != 0) {
      return (
        <div className={styles.error}>
          <span> building form failed: {fetchFormStore.error}</span>
        </div>
      );
    }

    return (
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {fetchFormStore.fields.map((field) => {
          switch (field.type) {
            case FieldTypes.TEXT:
            case FieldTypes.EMAIL:
            case FieldTypes.NUMBER: {
              return (
                <Text key={field.fieldName} field={field} dispatch={dispatch} />
              );
            }
            case FieldTypes.MULTILINE: {
              return (
                <Multiline
                  key={field.fieldName}
                  field={field}
                  dispatch={dispatch}
                />
              );
            }
            case FieldTypes.SELECT: {
              return (
                <Selects
                  key={field.fieldName}
                  field={field}
                  dispatch={dispatch}
                />
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

  // render response if response is not null.
  const renderResponse = () => {
    if (sendFormStore.response != null) {
      return (
        <div className={styles.response}>
          <hr className={styles.line}></hr>
          <h3 className={styles.title}>Response</h3>
          <span>{JSON.stringify(sendFormStore.response)}</span>
        </div>
      );
    }

    if (sendFormStore.error.length != 0) {
      return (
        <div className={styles.error}>
          <span> sending form data failed: {sendFormStore.error}</span>
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
        {sendFormStore.isLoading ? (
          <div className={styles.loadingCircle}>
            <CircularProgress color="success" />
            <span>sending form data...</span>
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

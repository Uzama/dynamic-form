import { Button, LinearProgress, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Multiline, Selects, Text } from "../components/Fields";
import styles from "../styles/Home.module.css";
import { FieldTypes } from "../types/FetchData";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { select, fetchField } from "../app/FetchData";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector(select);

  useEffect(() => {
    dispatch(fetchField());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let body: { [k: string]: string | number | undefined } = {};

    store.data.forEach((data) => {
      body[data.fieldName] = data.value;
    });

    console.log(body);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamic Form</title>
      </Head>
      <main className={styles.main}>
        <h2 className={styles.title}>Dynamic Form</h2>
        {store.isLoading ? (
          <div className={styles.loading}>
            <LinearProgress />
            <span>form is building...</span>
          </div>
        ) : store.error.length != 0 ? (
          <div className={styles.error}>
            <span> build failed::: {store.error}</span>
          </div>
        ) : (
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            {store.data.map((data) => {
              switch (data.type) {
                case FieldTypes.TEXT:
                case FieldTypes.EMAIL:
                case FieldTypes.NUMBER: {
                  return (
                    <Text
                      key={data.fieldName}
                      data={data}
                      dispatch={dispatch}
                    />
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
                    <Selects
                      key={data.fieldName}
                      data={data}
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
        )}
      </main>
    </div>
  );
};

export default Home;

import { Button } from "@mui/material";
import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Multiline, Selects, Text } from "../components/Fields";
import styles from "../styles/Home.module.css";
import { Data, FieldTypes } from "../types/FetchData";

const Home: NextPage = () => {
  const [state, setState] = useState<Data[]>([
    {
      fieldName: "firstName",
      type: "text",
      value: "Layla",
    },
    {
      fieldName: "lastName",
      type: "text",
      value: "Leannon",
    },
    {
      fieldName: "emailAddress",
      type: "email",
      value: "Cora_Daniel80@gmail.com",
    },
    {
      fieldName: "Account",
      type: "text",
      value: "revolutionary",
    },
    {
      fieldName: "gender",
      type: "select",
      value: "male",
      options: ["male", "female", "other"],
    },
    {
      fieldName: "testimonial",
      type: "multiline",
      value:
        "Non sed doloribus tenetur non. Aliquam voluptatem velit facilis excepturi quisquam reiciendis sunt. Et provident sapiente omnis repellat repellat itaque ad.",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamic Form</title>
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Dynamic Form</h2>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          {state.map((data) => {
            switch (data.type) {
              case FieldTypes.TEXT:
              case FieldTypes.EMAIL:
              case FieldTypes.NUMBER: {
                return (
                  <Text
                    key={data.fieldName}
                    data={data}
                    state={state}
                    setState={setState}
                  />
                );
              }
              case FieldTypes.MULTILINE: {
                return (
                  <Multiline
                    key={data.fieldName}
                    data={data}
                    state={state}
                    setState={setState}
                  />
                );
              }
              case FieldTypes.SELECT: {
                return (
                  <Selects
                    key={data.fieldName}
                    data={data}
                    state={state}
                    setState={setState}
                  />
                );
              }
            }
          })}

          <Button className={styles.button} type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Home;

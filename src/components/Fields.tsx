import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import { Data } from "../types/FetchData";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { FetchDataStore } from "../app/FetchData";
import styles from "../styles/Home.module.css";

import { updateValue } from "../app/FetchData";

interface Props {
  data: Data;
  dispatch: ThunkDispatch<
    {
      fetchDataReducer: FetchDataStore;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>;
}

export const Text: React.FC<Props> = ({ data, dispatch }) => {
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    data = { ...data, value: e.target.value };
    dispatch(updateValue(data));
  };

  return (
    <TextField
      className={styles.field}
      value={data.value}
      id={data.fieldName}
      label={data.fieldName}
      variant="outlined"
      type={data.type}
      onChange={(e) => handleOnChange(e)}
    />
  );
};

export const Multiline: React.FC<Props> = ({ data, dispatch }) => {
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    data = { ...data, value: e.target.value };
    dispatch(updateValue(data));
  };

  return (
    <TextField
      className={styles.field}
      value={data.value}
      id={data.fieldName}
      label={data.fieldName}
      variant="outlined"
      multiline
      onChange={(e) => handleOnChange(e)}
    />
  );
};

export const Selects: React.FC<Props> = ({ data, dispatch }) => {
  const handleOnChange = (e: SelectChangeEvent<string | number>) => {
    data = { ...data, value: e.target.value };
    dispatch(updateValue(data));
  };

  return (
    <FormControl className={styles.field} fullWidth>
      <InputLabel id={data.fieldName}>{data.fieldName}</InputLabel>
      <Select
        labelId={data.fieldName}
        id={data.fieldName}
        value={data.value}
        label={data.fieldName}
        onChange={(e) => handleOnChange(e)}
      >
        {data.options?.map((option) => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

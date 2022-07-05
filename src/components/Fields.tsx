import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import { Field } from "../types/FetchForm";
import styles from "../styles/Home.module.css";

import { updateFieldValue } from "../app/FetchForm";

interface Props {
  field: Field;
  dispatch: any;
}

export const Text: React.FC<Props> = ({ field, dispatch }) => {
  // update changed value to global store
  const handleOnChange = (e: any) => {
    field = { ...field, value: e.target.value };
    dispatch(updateFieldValue(field));
  };

  return (
    <TextField
      className={styles.field}
      value={field.value}
      id={field.fieldName}
      label={field.fieldName}
      variant="outlined"
      type={field.type}
      onChange={(e) => handleOnChange(e)}
    />
  );
};

export const Multiline: React.FC<Props> = ({ field, dispatch }) => {
  // update changed value to global store
  const handleOnChange = (e: any) => {
    field = { ...field, value: e.target.value };
    dispatch(updateFieldValue(field));
  };

  return (
    <TextField
      className={styles.field}
      value={field.value}
      id={field.fieldName}
      label={field.fieldName}
      variant="outlined"
      multiline
      onChange={(e) => handleOnChange(e)}
    />
  );
};

export const Selects: React.FC<Props> = ({ field, dispatch }) => {
  // update changed value to global store
  const handleOnChange = (e: any) => {
    field = { ...field, value: e.target.value };
    dispatch(updateFieldValue(field));
  };

  return (
    <FormControl className={styles.field} fullWidth>
      <InputLabel id={field.fieldName}>{field.fieldName}</InputLabel>
      <Select
        labelId={field.fieldName}
        id={field.fieldName}
        value={field.value}
        label={field.fieldName}
        onChange={(e) => handleOnChange(e)}
      >
        {field.options?.map((option) => {
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

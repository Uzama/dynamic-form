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

interface Props {
  data: Data;
  state: Data[];
  setState: Dispatch<SetStateAction<Data[]>>;
}

export const Text: React.FC<Props> = ({ data, state, setState }) => {
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState(
      state.map((ele) =>
        ele.fieldName === data.fieldName
          ? { ...ele, value: e.target.value }
          : ele
      )
    );
  };

  return (
    <TextField
      value={data.value}
      id={data.fieldName}
      label={data.fieldName}
      variant="outlined"
      type={data.type}
      onChange={(e) => handleOnChange(e)}
    />
  );
};

export const Multiline: React.FC<Props> = ({ data, state, setState }) => {
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState(
      state.map((ele) =>
        ele.fieldName === data.fieldName
          ? { ...ele, value: e.target.value }
          : ele
      )
    );
  };

  return (
    <TextField
      value={data.value}
      id={data.fieldName}
      label={data.fieldName}
      variant="outlined"
      multiline
      onChange={(e) => handleOnChange(e)}
    />
  );
};

export const Selects: React.FC<Props> = ({ data, state, setState }) => {
  const handleOnChange = (e: SelectChangeEvent<string | number>) => {
    setState(
      state.map((ele) =>
        ele.fieldName === data.fieldName
          ? { ...ele, value: e.target.value }
          : ele
      )
    );
  };

  return (
    <FormControl fullWidth>
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

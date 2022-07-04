import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../types/FetchData";
import { RootState } from "./Store";

export interface FetchDataStore {
  isLoading: boolean;
  error: string;
  data: Data[];
}

const initialState: FetchDataStore = {
  isLoading: false,
  error: "",
  data: [
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
  ],
};

export const fetchDataSlice = createSlice({
  name: "fetchData",
  initialState: initialState,
  reducers: {
    updateValue: (state: FetchDataStore, action: PayloadAction<Data>) => {
      state.data.map((field) => {
        if (field.fieldName === action.payload.fieldName) {
          field.value = action.payload.value;
        }
      });
    },
    updateLoading: (state: FetchDataStore, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateError: (state: FetchDataStore, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { updateValue, updateLoading, updateError } =
  fetchDataSlice.actions;

export const select = (state: RootState) => state.fetchDataReducer;

export default fetchDataSlice.reducer;

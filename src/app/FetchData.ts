import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data, Response } from "../types/FetchData";
import { RootState } from "./Store";

export interface FetchDataStore {
  isLoading: boolean;
  error: string;
  data: Data[];
}

const initialState: FetchDataStore = {
  isLoading: true,
  error: "",
  data: [],
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
    fetchData: (state: FetchDataStore) => {
      state.isLoading = true;
    },
    fetchDataError: (state: FetchDataStore, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchDataSuccess: (
      state: FetchDataStore,
      action: PayloadAction<Data[]>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.data = action.payload;
    },
  },
});

export const { updateValue, fetchData, fetchDataError, fetchDataSuccess } =
  fetchDataSlice.actions;

export const select = (state: RootState) => state.fetchDataReducer;

export default fetchDataSlice.reducer;

export function fetchField() {
  return async (dispatch: any) => {
    dispatch(fetchData());

    try {
      const response = await fetch(
        "https://ulventech-react-exam.netlify.app/api/form"
      );

      const data: Response = await response.json();

      dispatch(fetchDataSuccess(data.data));
    } catch (error) {
      dispatch(fetchDataError("fetching failed"));
    }
  };
}

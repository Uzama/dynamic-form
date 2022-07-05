import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Field, Response } from "../types/FetchForm";
import { RootState } from "./Store";

export interface FetchFormStore {
  isLoading: boolean;
  error: string;
  fields: Field[];
}

const initialState: FetchFormStore = {
  isLoading: true,
  error: "",
  fields: [],
};

export const fetchFormSlice = createSlice({
  name: "fetchForm",
  initialState: initialState,
  reducers: {
    updateFieldValue: (state: FetchFormStore, action: PayloadAction<Field>) => {
      state.fields.map((field) => {
        if (field.fieldName === action.payload.fieldName) {
          field.value = action.payload.value;
        }
      });
    },
    fetchForm: (state: FetchFormStore) => {
      state.isLoading = true;
    },
    fetchFormError: (state: FetchFormStore, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchFormSuccess: (
      state: FetchFormStore,
      action: PayloadAction<Field[]>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.fields = action.payload;
    },
  },
});

export const { updateFieldValue, fetchForm, fetchFormError, fetchFormSuccess } =
  fetchFormSlice.actions;

export const fetchFormSelect = (state: RootState) => state.fetchFormReducer;

export default fetchFormSlice.reducer;

// calling to external api
export function fetchFormData() {
  return async (dispatch: any) => {
    dispatch(fetchForm());

    try {
      const response = await fetch(
        "https://ulventech-react-exam.netlify.app/api/form"
      );

      const data: Response = await response.json();

      if (!data.success) {
        dispatch(fetchFormError(data.message));
        return;
      }

      dispatch(fetchFormSuccess(data.data));
    } catch (error) {
      dispatch(fetchFormError("fetching failed"));
    }
  };
}

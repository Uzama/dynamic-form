import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Response } from "../types/SendForm";
import { RootState } from "./Store";

export interface SendFormStore {
  isLoading: boolean;
  error: string;
  response: Response | null;
}

const initialState: SendFormStore = {
  isLoading: false,
  error: "",
  response: null,
};

export const sendFormSlice = createSlice({
  name: "sendForm",
  initialState: initialState,
  reducers: {
    resetStore: (state: SendFormStore) => {
      state.response = null;
      state.isLoading = false;
      state.error = "";
    },
    sendForm: (state: SendFormStore) => {
      state.isLoading = true;
    },
    sendFormError: (state: SendFormStore, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.response = null;
    },
    sendFormSuccess: (
      state: SendFormStore,
      action: PayloadAction<Response>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.response = action.payload;
    },
  },
});

export const { resetStore, sendForm, sendFormError, sendFormSuccess } =
  sendFormSlice.actions;

export const sendFormStore = (state: RootState) => state.sendFormReducer;

export default sendFormSlice.reducer;

export function sendFormData(body: {
  [k: string]: string | number | undefined;
}) {
  return async (dispatch: any) => {
    dispatch(sendForm());

    try {
      const response = await fetch(
        "https://ulventech-react-exam.netlify.app/api/form",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data: Response = await response.json();

      if (!data.success) {
        dispatch(sendFormError(data.message));
        return;
      }

      dispatch(sendFormSuccess(data));
    } catch (error) {
      dispatch(sendFormError("fetching failed"));
    }
  };
}

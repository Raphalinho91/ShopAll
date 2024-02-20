import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendEmail } from "../../services/sendEmail";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const postSendEmail = createAsyncThunk(
  "api/send-email",
  async (profile) => {
    try {
      const response = await sendEmail.sendUser(profile);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const SendEmailSlice = createSlice({
  name: "SendEmail",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postSendEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postSendEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(postSendEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectSendEmail = (state) => state.SendEmail.user;
export const selectSendEmailStatus = (state) => state.SendEmail.status;
export const selectSendEmailError = (state) => state.SendEmail.error;

export default SendEmailSlice.reducer;

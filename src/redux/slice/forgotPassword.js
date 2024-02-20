import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgotPassword } from "../../services/forgotPassword";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const postSendEmailPassword = createAsyncThunk(
  "/api/send-verification-email-password",
  async (profile) => {
    try {
      const response = await forgotPassword.forgotPwd(profile);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const SendEmailPasswordSlice = createSlice({
  name: "SendEmailPassword",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postSendEmailPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postSendEmailPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(postSendEmailPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectSendEmailPassword = (state) => state.SendEmailPassword.user;
export const selectSendEmailPasswordStatus = (state) => state.SendEmailPassword.status;
export const selectSendEmailPasswordError = (state) => state.SendEmailPassword.error;

export default SendEmailPasswordSlice.reducer;

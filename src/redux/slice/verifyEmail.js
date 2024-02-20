import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyEmailCode } from "../../services/verifyEmail";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const postVerifyEmail = createAsyncThunk(
  "api/verify-email-code",
  async (profile) => {
    try {
      const response = await verifyEmailCode.verifyEmail(profile);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const VerifyEmailSlice = createSlice({
  name: "VerifyEmail",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postVerifyEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postVerifyEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(postVerifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectVerifyEmail = (state) => state.VerifyEmail.user;
export const selectVerifyEmailStatus = (state) => state.VerifyEmail.status;
export const selectVerifyEmailError = (state) => state.VerifyEmail.error;

export default VerifyEmailSlice.reducer;

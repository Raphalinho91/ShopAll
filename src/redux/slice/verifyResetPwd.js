import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyResetEmail } from "../../services/verifyResetCode";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const postVerifyEmailPassword = createAsyncThunk("/api/verify-password-code", async (profile, { getState, rejectWithValue }) => {
    try {
      const response = await verifyResetEmail.verifyEmailPassword(profile);
      const token = response.data.token;
  
      const serializableResponse = {
        data: response.data.data,
        status: response.status,
      };
  
      return { token, response: serializableResponse };
    } catch (error) {
      console.error("Error during sign in:", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  });

export const VerifyEmailPasswordSlice = createSlice({
  name: "VerifyEmailPassword",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postVerifyEmailPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postVerifyEmailPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.user = action.payload.user;
        const token = action.payload.token;
        localStorage.setItem("token", token);
      })
      .addCase(postVerifyEmailPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectVerifyEmailPassword = (state) => state.VerifyEmailPassword.user;
export const selectVerifyEmailPasswordStatus = (state) => state.VerifyEmailPassword.status;
export const selectVerifyEmailPasswordError = (state) => state.VerifyEmailPassword.error;

export default VerifyEmailPasswordSlice.reducer;

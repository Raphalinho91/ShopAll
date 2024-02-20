import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updatePassword } from "../../services/updatePassword";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const postNewPassword = createAsyncThunk(
  "api/update-password",
  async (profile, { rejectWithValue }) => {
    try {
      const response = await updatePassword.updatePwd(profile);
      return response.data; 
    } catch (error) {
      console.error("Error during getUserInfo:", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const UpdatePasswordSlice = createSlice({
  name: "UpdatePassword",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postNewPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(postNewPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
  
});

export const selectUpdatePassword = (state) => state.UpdatePassword.user;
export const selectUpdatePasswordStatus = (state) => state.UpdatePassword.status;
export const selectUpdatePasswordError = (state) => state.UpdatePassword.error;

export default UpdatePasswordSlice.reducer;

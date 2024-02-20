import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAdmin } from "../../services/userAdmin";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const getUserAdmin = createAsyncThunk(
  "api/admin-user",
  async (profile, { rejectWithValue }) => {
    try {
      const response = await userAdmin.getUserAdmin(profile);
      if (!response.data.success) {
        return rejectWithValue(response.data);
      }
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

export const UserAdminSlice = createSlice({
  name: "UserAdmin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAdmin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.status = "succeeded";
          state.user = action.payload.user;
        } else {
          state.status = "failed";
          state.error = action.payload.message;
        }
      })
      .addCase(getUserAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload.message : "An error occurred";
      });
  },
});

export const selectUserAdmin = (state) => state.UserAdmin.user;
export const selectUserAdminStatus = (state) => state.UserAdmin.status;
export const selectUserAdminError = (state) => state.UserAdmin.error;

export default UserAdminSlice.reducer;

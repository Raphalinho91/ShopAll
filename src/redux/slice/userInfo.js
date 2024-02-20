import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userInfo } from "../../services/userInfo";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const getUserInfo = createAsyncThunk(
  "api/user-info",
  async (profile, { rejectWithValue }) => {
    try {
      const response = await userInfo.getUserInfo(profile);
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

export const UserInfoSlice = createSlice({
  name: "UserInfo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
  
});

export const selectUserInfo = (state) => state.UserInfo.user;
export const selectUserInfoStatus = (state) => state.UserInfo.status;
export const selectUserInfoError = (state) => state.UserInfo.error;

export default UserInfoSlice.reducer;

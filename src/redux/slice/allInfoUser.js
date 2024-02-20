import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allUsers } from "../../services/allInfoUser";

export const initialState = {
  error: null,
  user: null,
  users: [],
  message: "",
  isLoading: false,
  status: "idle",
};

export const getInfoAllUsers = createAsyncThunk("api/allUsers", async (profile) => {
  try {
    const response = await allUsers.getAllUser(profile);
    console.log(response)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error)
      throw error.response.data;
    } else {
      throw error;
    }
  }
});


export const InfoAllUsersSlice = createSlice({
  name: "InfoAllUsers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getInfoAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getInfoAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.users;
        console.log(state.users);
      })
      .addCase(getInfoAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log(action.payload)
      })
  },
});


export const selectInfoAllUsers = (state) => state.InfoAllUsers.users;
export const selectStatus = (state) => state.InfoAllUsers.status;
export const selectError = (state) => state.InfoAllUsers.error;

export default InfoAllUsersSlice.reducer;

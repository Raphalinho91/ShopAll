import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteOneUser } from "../../services/deleteOneUser";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const deleteUserById = createAsyncThunk(`api/delete/:userId`, async (userId) => {
  try {
    const response = await deleteOneUser.userDelete(userId);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
});


export const deleteOneUserSlice = createSlice({
  name: "deleteOneUser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.deletionSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.message = action.payload;
      })
  },
});


export const selectdeleteOneUser = (state) => state.deleteOneUser.user;
export const selectStatus = (state) => state.deleteOneUser.status;
export const selectError = (state) => state.deleteOneUser.error;

export default deleteOneUserSlice.reducer;

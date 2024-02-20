import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { infoPerso } from "../../services/infoPerso";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const postInfoPerso = createAsyncThunk("api/info-perso", async (profile) => {
  try {
    const response = await infoPerso.userInfoPerso(profile);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
});


export const InfoPersoSlice = createSlice({
  name: "InfoPerso",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postInfoPerso.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postInfoPerso.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(postInfoPerso.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});


export const selectInfoPerso = (state) => state.InfoPerso.user;
export const selectStatus = (state) => state.InfoPerso.status;
export const selectError = (state) => state.InfoPerso.error;

export default InfoPersoSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inscription } from "../../services/inscription";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const postInscription = createAsyncThunk("api/signup", async (profile) => {
  try {
    const response = await inscription.createUser(profile);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
});


export const InscriptionSlice = createSlice({
  name: "Inscription",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postInscription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postInscription.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(postInscription.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.message = action.payload;
      })
  },
});


export const selectInscription = (state) => state.Inscription.user;
export const selectStatus = (state) => state.Inscription.status;
export const selectError = (state) => state.Inscription.error;

export default InscriptionSlice.reducer;

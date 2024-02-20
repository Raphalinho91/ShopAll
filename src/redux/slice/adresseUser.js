import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adresseUser } from "../../services/adresseUser";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const postAdresse = createAsyncThunk("api/adresse", async (profile) => {
  try {
    const response = await adresseUser.userAdresse(profile);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
});


export const AdresseSlice = createSlice({
  name: "Adresse",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postAdresse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postAdresse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(postAdresse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
  },
});


export const selectAdresse = (state) => state.Adresse.user;
export const selectAdresseStatus = (state) => state.Adresse.status;
export const selectError = (state) => state.Adresse.error;

export default AdresseSlice.reducer;

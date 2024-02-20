import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { infoBancaire } from "../../services/infoBancaire";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const postInfoBancaire = createAsyncThunk("api/info-bancaire", async (profile) => {
  try {
    const response = await infoBancaire.unserBancaire(profile);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
});


export const InfoBancaireSlice = createSlice({
  name: "InfoBancaire",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postInfoBancaire.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postInfoBancaire.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(postInfoBancaire.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
  },
});


export const selectInfoBancaire = (state) => state.InfoBancaire.user;
export const selectStatus = (state) => state.InfoBancaire.status;
export const selectError = (state) => state.InfoBancaire.error;

export default InfoBancaireSlice.reducer;

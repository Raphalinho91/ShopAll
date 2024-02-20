import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { connection } from "../../services/connection";

export const initialState = {
  error: null,
  user: null,
  message: "",
  isLoading: false,
  status: "idle",
};

export const postConnection = createAsyncThunk("/api/signin", async (profile, { getState, rejectWithValue }) => {
  try {
    const response = await connection.connectUser(profile);
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

export const ConnectionSlice = createSlice({
  name: "Connection",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postConnection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postConnection.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.message = action.payload.message;
        const token = action.payload.token;
        localStorage.setItem("token", token);
      })
      .addCase(postConnection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.message = action.payload;
      })
  },
});


export const selectConnection = (state) => state.Connection.user;
export const selectStatus = (state) => state.Connection.status;
export const selectError = (state) => state.Connection.error;

export default ConnectionSlice.reducer;

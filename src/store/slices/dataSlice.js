import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  context: "",
  urlsArray: [],
  meteData: [],
  dataSliceStatus: "idle", //| "pending" | "succeeded" | "failed",
  signinError: null,
};

export const fetchSimilarDocs = createAsyncThunk("data", async (params) => {
  const apiUrl = "https://t4w8ilx8bg.execute-api.us-east-1.amazonaws.com/genai-app-poc-ApiStage";
  const accessToken = params.accessToken;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    accept: "application/json",
  };
  try {
    const response = await axios.post(apiUrl, params.query, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSimilarDocs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const authActions = authSlice.actions;
export const getSigninStatus = (state) => state.auth.signinStatus;

export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  dataSliceStatus: "idle", //| "pending" | "succeeded" | "failed",
  dataSliceError: null,
};

export const fetchSimilarDocs = createAsyncThunk("data", async (params) => {
  // console.log({ params }); //{q: "Ali"}
  const apiUrl = "https://wjq3pdij55.execute-api.us-east-1.amazonaws.com/genai-app-poc-ApiStage/api/v1/llm/rag";
  // const accessToken = params.accessToken;
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };
  try {
    const response = await axios.post(apiUrl, params, {
      headers,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error.response;
  }
});

const authSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarDocs.pending, (state) => {
        state.dataSliceStatus = "pending";
        state.error = null;
      })
      .addCase(fetchSimilarDocs.fulfilled, (state, action) => {
        state.dataSliceStatus = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSimilarDocs.rejected, (state, action) => {
        console.log(action.payload);
        state.dataSliceStatus = "rejected";
        state.error = action.error.message;
      });
  },
});

export const authActions = authSlice.actions;
export const getDataSliceStatus = (state) => state.auth.dataSliceStatus;
export const getDataSliceError = (state) => state.auth.error;
export const getData = (state) => state.auth.data;

export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  dataSliceStatus: "idle", //| "pending" | "succeeded" | "failed",
  dataSliceError: null,
};

export const fetchSimilarDocs = createAsyncThunk("data", async (params) => {
  console.log({ params }); //{q: "Ali"}
  const apiUrl = "https://ltx38b0zf0.execute-api.us-east-1.amazonaws.com/genai-app-poc-ApiStage/api/v1/llm/rag";

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${params.accessToken}`,
  };
  try {
    const response = await axios.post(apiUrl, params, {
      headers,
    });
    const responseBody = JSON.parse(response.data.body);
    const responseBodyData = responseBody.response.data;
    return responseBodyData;
  } catch (error) {
    throw error.response;
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetState: (state) => {
      state.dataSliceStatus = "idle";
    },
  },
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
        // console.log(action.payload);
        state.dataSliceStatus = "rejected";
        state.error = action.error.message;
      });
  },
});

export const dataSliceActions = dataSlice.actions;
export const getDataSliceStatus = (state) => state.data.dataSliceStatus;
export const getDataSliceError = (state) => state.data.error;
export const getData = (state) => state.data.data;

export default dataSlice.reducer;

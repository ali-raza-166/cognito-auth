import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refreshIdToken } from "./authSlice";
import axios from "axios";
const initialState = {
  data: {},
  dataSliceStatus: "idle", //| "pending" | "succeeded" | "failed" | "rejected",
  dataSliceError: null,
};
const getApiData = async (apiUrl, token, params) => {
  const response = await axios.post(apiUrl, params, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseBody = JSON.parse(response.data.body);
  const responseBodyData = responseBody.response.data;
  return responseBodyData;
};
export const fetchSimilarDocs = createAsyncThunk("data", async (params, { dispatch, rejectWithValue }) => {
  const apiUrl = "https://ig0161ug70.execute-api.us-east-1.amazonaws.com/genai-app-poc-ApiStage/api/v1/llm/rag";
  try {
    const response = await getApiData(apiUrl, params.accessToken, params);
    return response;
  } catch (error) {
    if (error?.response?.status === 401) {
      console.log("unAuth");
      try {
        await dispatch(refreshIdToken(params.refreshToken));
        const response = await getApiData(apiUrl, localStorage.getItem("accessToken"), params);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
    return rejectWithValue(error);
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
        if (action.payload.metadata) {
          state.dataSliceStatus = "succeeded";
          state.data = action.payload;
        } else {
          state.dataSliceStatus = "failed";
          state.data = {};
        }
      })
      .addCase(fetchSimilarDocs.rejected, (state) => {
        state.data = {};
        state.dataSliceStatus = "rejected";
        state.dataSliceError = "Something went wrong";
      });
  },
});

export const dataSliceActions = dataSlice.actions;
export const getDataSliceStatus = (state) => state.data.dataSliceStatus;
export const getDataSliceError = (state) => state.data.error;
export const getData = (state) => state.data.data;

export default dataSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: localStorage.getItem("email"),
  isLoggedIn: localStorage.getItem("isLoggedIn"),
  firstLogin: false,
  passwordChanged: false,
  authError: null,
  authStatus: "idle", // "succeeded" | "failed" | "loading" | rejected,
  IdToken: localStorage.getItem("IdToken"),
};

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await axios.post(
      "https://h97pr38l7i.execute-api.us-east-1.amazonaws.com/stage/auth/login",
      credentials
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.message); //Request failed with status code 500
    // console.log("Response error message", error.response.data.response.message);
    // console.log("Response Code", error.response.data.responseCode);
    // return error.response.data;
    return error;
  }
});
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (credentials) => {
    try {
      const response = await axios.post(
        "https://h97pr38l7i.execute-api.us-east-1.amazonaws.com/stage/auth/changePassword",
        credentials
      );
      // console.log("Change Password Thunk Response", response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.IdToken = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("IdToken");
      localStorage.removeItem("email");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.authStatus = "pending";
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const data = action.payload.response.data;
        const ChallengeParameters = data.ChallengeParameters;
        if (action.payload?.response?.data?.responseCode === 500) {
          //this handles if email/passwrd is wrong
          state.authStatus = "failed";
          state.authError = "Login Failed";
        } else {
          if (Object?.keys(ChallengeParameters)?.length !== 0) {
            //checking first signin in this if check
            const parsedAtt = JSON.parse(ChallengeParameters.userAttributes);
            state.firstLogin = true;
            state.email = parsedAtt.email;
            localStorage.setItem("email", parsedAtt.email);
            state.authStatus = "succeeded";
            state.authError = null;
          } else {
            //if second signin
            // console.log(data.AuthenticationResult.IdToken);
            state.IdToken = data.AuthenticationResult.IdToken;
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("IdToken", data.AuthenticationResult.IdToken);
            state.authStatus = "succeeded";
            state.authError = null;
          }
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.authStatus = "rejected";
        // state.authError = action.payload.response.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.authStatus = "pending";
        state.authError = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        // console.log("Change action.payload", action.payload);
        // console.log("statussss", action.payload.response.data.ResponseMetadata.HTTPStatusCode);
        if (
          action.payload.response.data.ResponseMetadata.HTTPStatusCode === 200
        ) {
          state.passwordChanged = true;
          localStorage.setItem("isLoggedIn", false);
        }
        state.authStatus = "succeeded";
        state.authError = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.authStatus = "rejected";
        state.authError = action.error.message;
      });
  },
});

export const authActions = authSlice.actions;
export const getAuthStatus = (state) => state.auth.authStatus;
export const getAuthError = (state) => state.auth.authError;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getFirstLogin = (state) => state.auth.firstLogin;
export const getUserEmail = (state) => state.auth.email;
export const getPasswordChanged = (state) => state.auth.passwordChanged;
export const getIdToken = (state) => state.auth.IdToken;
export default authSlice.reducer;

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  AuthedUser: null,
  LoginError: false,
};
export const handleUserLogin = createAsyncThunk(
  "auth/handleUserLogin",
  async (userObject) => {
    const { userName, Password } = userObject;
    console.log(userObject);
    const response = await axios.post(
      "http://168.119.12.58/users/authenticate",
      {
        userName,
        Password,
      }
    );
    return response.data;
  }
);
export const handleLogout = () => {
  return (dispatch) => {
    dispatch(logOut());
    console.log(logOut());
    localStorage.removeItem("AuthedUser");
  };
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // actions
    checkUser: (state) => {
      const AuthedUser = localStorage.getItem("AuthedUser");
      if (AuthedUser) {
        const authedUserData = JSON.parse(AuthedUser);
        state.AuthedUser = authedUserData;
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    logOut: (state) => {
      state.AuthedUser = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        handleUserLogin.fulfilled,
        (state, action) => {
          console.log("fulfilled", state, action);
          state.AuthedUser = action.payload;
          state.isLoggedIn = true;
          localStorage.setItem("AuthedUser", JSON.stringify(action.payload));
        }
        )
        .addCase(handleUserLogin.rejected, (state) => {
        console.log("rejected", state);
        state.LoginError = true;
      });
  },
});
export const { checkUser, logOut } = authSlice.actions;
export default authSlice.reducer;

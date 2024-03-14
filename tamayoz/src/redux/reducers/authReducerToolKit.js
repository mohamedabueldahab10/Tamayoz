import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: true,
    AuthedUser: null,
    LoginError: false,
  },
  reducers: {
    setAuthedUser: (state, action) => {
      console.log("action",action);
      console.log("state",state);
      state.AuthedUser = action.payload;
      state.isLoggedIn = true;
      state.LoginError = false;
    },
    logOut: (state, action) => {
      state.AuthedUser = {};
      state.isLoggedIn = false;
    },
  },
});
export const { setAuthedUser, logOut } = counterSlice.actions;

export default counterSlice.reducer;

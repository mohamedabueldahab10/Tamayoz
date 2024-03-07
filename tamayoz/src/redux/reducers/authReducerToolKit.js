import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    AuthedUser: null,
    LoginError: false,
  },
  reducers: {
    setAuthedUser: (state, action) => {
      state.AuthedUser = action.payload;
      state.isLoggedIn = true;
      state.LoginError = false;
    },
    logOut: (state) => {
      state.AuthedUser = {};
      state.isLoggedIn = false;
    },
  },
});
export const { setAuthedUser, logOut } = counterSlice.actions;

export default counterSlice.reducer;

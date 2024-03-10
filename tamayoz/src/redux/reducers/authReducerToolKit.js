import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    AuthedUser: null,
  },
  reducers: {
    setAuthedUser: (state, action) => {
      console.log(state,action);
      state.AuthedUser = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      console.log(state);
      state.AuthedUser = null;
      state.isLoggedIn = false;
    },
  },
});
export const { setAuthedUser, logOut } = authSlice.actions;

export default authSlice.reducer;

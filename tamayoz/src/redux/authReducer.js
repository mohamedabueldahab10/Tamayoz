import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const handleUserLogin = createAsyncThunk(
  "auth/handleUserLogin",
  async (userObject) => {
    const { userName, Password } = userObject;
    const response = await axios.post(
      "http://168.119.12.58/users/authenticate",
      {
        userName,
        Password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data;
  }
);

export const handleLogout = () => {
  return (dispatch) => {
    dispatch(logOut());
    localStorage.removeItem("AuthedUser");
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: null,
    AuthedUser: null,
    LoginError: false,
  },
  reducers: {
    setAuthedUser: (state, action) => {
      state.AuthedUser = action.payload;
      state.isLoggedIn = true;
      state.LoginError = false;
    },
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
    .addCase(handleUserLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })  
    .addCase(
        handleUserLogin.fulfilled,
        (state, action) => {
          state.AuthedUser = action.payload;
          state.isLoggedIn = true;
          localStorage.setItem("AuthedUser", JSON.stringify(action.payload));
        }
        )
        .addCase(handleUserLogin.rejected, (state,action) => {
        state.LoginError = action.error;
      });
  },
});

export const { setAuthedUser, logOut,checkUser } = authSlice.actions;

export default authSlice.reducer;
